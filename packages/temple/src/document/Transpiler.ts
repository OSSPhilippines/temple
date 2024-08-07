//types
import type { 
  ComponentToken, 
  MarkupToken,
  MarkupChildToken 
} from '../component/types';
import type Component from '../component/Component';
//file systems
import path from 'path';
//parsers
import { VariableDeclarationKind } from 'ts-morph';
import Parser from '../component/Parser';
import ComponentTranspiler from '../component/Transpiler';

export default class Transpiler extends ComponentTranspiler {
  /**
   * Generates document code to be used on the server
   */
  public transpile() {
    const { 
      id,
      absolute, 
      brand, 
      classname, 
      imports,
      scripts, 
      styles 
    } = this._component;

    //get path without extension
    //ex. /path/to/Counter.tml -> /path/to/Counter
    const extname = path.extname(absolute);
    const filePath = absolute.slice(0, -extname.length);
    //create a new source file
    const { source } = this._createSourceFile(`${filePath}.ts`);
    //import { 
    //  data,
    //  TempleElement, 
    //  TempleDocument, 
    //  TempleException 
    //} from '@ossph/temple/server';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/server',
      namedImports: [
        'data as __APP_DATA__',
        'TempleElement',  
        'TempleDocument', 
        'TempleException'
      ]
    });
    //import others from <script>
    imports.forEach(imported => {
      const specifier = imported.source
        //replace client with server
        .replace('@ossph/temple/client', '@ossph/temple/server')
        //replace client with server
        .replace('@ossph/temple/client', '@ossph/temple/server');
      if (imported.default && imported.names) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: specifier,
          defaultImport: imported.default,
          namedImports: imported.names
        });
      } else if (imported.default) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: specifier,
          defaultImport: imported.default
        });
      } else if (imported.names) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: specifier,
          namedImports: imported.names
        });
      }
    });
    //TempleDocument.brand = 'temple';
    source.addStatements(`TempleDocument.brand = '${brand}';`);
    //export default class FoobarComponent
    const component = source.addClass({
      name: `${classname}_${id}`,
      isDefaultExport: true,
    });
    //protected _bundler: (clientScript) => string
    component.addProperty({ name: '_client', type: 'string'});
    //public constructor(clientScript: string)
    component.addConstructor({
      parameters: [ { name: 'client', type: 'string' } ],
      statements: `this._client = client;`
    });
    //public style()
    component.addMethod({
      name: 'styles',
      returnType: 'string',
      statements: `return \`${styles.join('\n').trim()}\`;`
    });
    //public template()
    component.addMethod({
      name: 'template',
      statements: `
        ${scripts.length > 0 
          ? scripts.join('\n')
          : `const props = __APP_DATA__.get('props') || {};`
        }
        return ${this.markup.trim()};
      `
    });
    //public render()
    component.addMethod({
      name: 'render',
      parameters: [ 
        { name: 'props?', type: 'Record<string, any>' } 
      ],
      returnType: 'string',
      statements: (`
        //set props (this is so template() can read it)
        __APP_DATA__.set('props', props || {});
        //set the current component (this is so template() can read it)
        __APP_DATA__.set('current', this);
        //get the styles
        const styles = this.styles();
        //get the children build w/o re-initializing the variables
        const children = this.template();
        //get the client script
        const clientScript = this._client;
        //reset the current component before validating
        __APP_DATA__.delete('current');
        
        //NOTE: in document there is no shadow dom
        //so there's no need to case for it...
    
        //used to prevent the browser from 
        //misinterpretting these tags
        const tags = {
          head: 'head',
          script: 'script',
          style: 'style'
        }
    
        //this is the <html> tag
        let document = TempleElement.render(children).trim();
        //check if the root element is an <html> tag
        if (!document.toLowerCase().startsWith('<html')) {
          throw TempleException.for('Document must start with an <html> tag.');
        }

        //we are good to go

        //if there are styles
        if (styles.length > 0) {
          //add styles to the head
          document = document.replace(
            \`</\${tags.head}>\`, 
            \`<\${tags.style}>\${styles}</\${tags.style}></\${tags.head}>\`
          );
        }
        //add props and bindings to the head
        document = document.replace(
          \`</\${tags.head}>\`, 
          \`<\${tags.script} class="templejs">window.__APP_DATA__ = \${JSON.stringify(
            Object.fromEntries(__APP_DATA__.entries())
          )};</\${tags.script}></\${tags.head}>\`
        );
        if (clientScript && clientScript.length > 0) {
          //add script to the head
          document = document.replace(
            \`</\${tags.head}>\`, 
            \`<\${tags.script} class="templejs">\${clientScript}</\${tags.script}></\${tags.head}>\`
          );
        }
        //prettify document
        document = document.replace(
          \`</\${tags.head}>\`, 
          \`<\${tags.script} class="templejs">Array.from(
            document.head.getElementsByTagName('\${tags.script}')
          ).filter(s => s.classList.contains('templejs')).forEach(s => s.remove());
          </\${tags.script}></\${tags.head}>\`
        );
        //return the full html
        return \`<!DOCTYPE html>\n\${document}\`;
      `)
    });
    //protected _toNodeList(value: any)
    component.addMethod({
      name: '_toNodeList',
      parameters: [ { name: 'value', type: 'any' } ],
      statements: `
        if (typeof value === 'object' 
          && typeof value.nodeType === 'number'
        ) {
          return [ value ];
        }
    
        if (Array.isArray(value)) {
          if (value.every(
            item => typeof item === 'object' 
              && typeof item.nodeType === 'number'
          )) {
            return value;
          }
        }
    
        return [ TempleDocument.createText(String(value)) ];
      `
    });

    return source;
  }

  /**
   * Returns a client script to be passed into the transpiled
   * render(client, props) method generated in transpile()
   */
  public client() {
    const { 
      brand, 
      imports, 
      scripts, 
      ast 
    } = this._component;
    //components and templates
    const partials = this._component.components.filter(
      //only components with tokens (all sub-components have this)
      component => !!component.token
    );
    //only components (vs templates)
    const components = partials.filter(
      component => component.type === 'component'
    );
    //create a new source file
    const { source } = this._createSourceFile('client.ts');
    //import type { Hash } from '@ossph/temple/client';
    source.addImportDeclaration({
      isTypeOnly: true,
      moduleSpecifier: '@ossph/temple/client',
      namedImports: [ 
        'Hash' 
      ]
    });
    //import { TempleDocument, emitter, data as __APP_DATA__ } from '@ossph/temple/client';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/client',
      namedImports: [ 
        'TempleDocument', 
        'emitter', 
        'data as __APP_DATA__' 
      ]
    });
    //import Counter_abc123 from './Counter_abc123'
    components.forEach(component => {
      const token = component.token as ComponentToken;
      //now import
      source.addImportDeclaration({
        moduleSpecifier: token.source.value,
        //we make sure there's no collisions
        //this is also matched when generating the component tree
        defaultImport: `${component.classname}_${component.id}`
      });
    });
    //import others from <script>
    imports.forEach(imported => {
      if (imported.default && imported.names) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: imported.source,
          defaultImport: imported.default,
          namedImports: imported.names
        });
      } else if (imported.default) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: imported.source,
          defaultImport: imported.default
        });
      } else if (imported.names) {
        source.addImportDeclaration({
          isTypeOnly: imported.typeOnly,
          moduleSpecifier: imported.source,
          namedImports: imported.names
        });
      }
    });

    source.addStatements(`emitter.once('ready', () => {
      //run the user entry script
      ${scripts.length > 0 
        ? scripts.join('\n')
        : `const props = __APP_DATA__.get('props') || {};`
      }
      //now serialize the props
      //this is predicting the order rendered on the server
      //with the order determined by doc.body.querySelectorAll
      const __BINDINGS__: Record<string, Record<string, any>> = ${this._bindings(ast.markup, partials)};
      //loop through the initial elements before js manipulation
      for (const element of document.body.querySelectorAll('*')) {
        //pull the attributes from the rendered HTML
        const attributes: Hash = Object.fromEntries(
          Array.from(element.attributes).map(
            attribute => [ attribute.nodeName, attribute.nodeValue ]
          )
        );
        //determine the id of the element by its index in the registry
        const id = String(TempleDocument.registry.size);
        //if the element has bindings
        if (__BINDINGS__[id]) {
          //this is where we need to add the bindings to the attributes
          Object.assign(attributes, __BINDINGS__[id]);
        }
        //finally add the element to the registry
        TempleDocument.register(element, attributes);
      }
      //after we registered all the elements, we can now register the 
      //components and let it manip the HTML further if it wants to
      ${components.map(component => {
        const { id, tagname, classname } = component;
        if (brand.length > 0) {
          return `customElements.define('${brand}-${tagname}', ${classname}_${id});`;
        } else {
          return `customElements.define('${tagname}', ${classname}_${id});`
        }
      }).join('\n')}
      //emit the mounted event
      emitter.emit('mounted', document.body);
    });`);

    //export { TempleComponent, TempleDocument, ... } from '@ossph/temple/client';
    source.addExportDeclaration({
      moduleSpecifier: '@ossph/temple/client',
      namedExports: [
        'data',
        'props',
        'children',
        'signal', 
        'emitter',
        'TempleComponent', 
        'TempleDocument', 
        'TempleElement', 
        'TempleEmitter', 
        'TempleException'
      ]
    });

    // export const components = { ... }
    source.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{
        name: 'components',
        initializer: `{
          ${components.map(component => {
            return `'${component.tagname}': ${component.classname}_${component.id}`;
          }).join(',\n')}
        }`
      }]
    });

    return source;
  }

  /**
   * Collect all the identifiers in markup so we know
   * what to pass in window.__BINDINGS__
   * object. We also need to get the component ids in order
   * of discovered.
   */
  protected _bindings(
    markup: MarkupChildToken[], 
    components: Component[],
    level = 0,
    total = { current: 0 }
  ) {
    const attributes = markup.map(token => {
      let expression = '';
      if (token.type !== 'MarkupExpression') {
        return expression;
      } else if (token.name === 'if' || token.name === 'each') {
        if (token.children) {
          expression += this._bindings(
            token.children, 
            components, 
            level + 1, 
            total
          );
        }
        return expression;
      //ignore head tags
      } else if (token.name === 'head') {
        return expression;
      //ignore body tag
      } else if (token.name === 'html' || token.name === 'body') {
        //but if it has children, we need to bind them
        if (token.children) {
          expression += this._bindings(
            token.children, 
            components, 
            level + 1, 
            total
          );
        }
        return expression;
      }
      //check to see if the token refers to
      //a component imported by this file
      const child = components.find(
        component => component.tagname === token.name
      );
      //we only hydrate elements and components
      if (child && child.type === 'template') {
        expression += this._bindings(
          child.ast.markup, 
          components, 
          level + 1, 
          total
        );
        return expression;
      }
      const id = total.current++;
      if (token.attributes && token.attributes.properties.length > 0) {
        expression += `'${id}': {`;
        expression += ' ' + token.attributes.properties.map(property => {
          if (property.value.type === 'Literal') {
            if (typeof property.value.value === 'string') {
              return `'${property.key.name}': \`${property.value.value}\``;
            }
            //null, true, false, number 
            return `'${property.key.name}': ${property.value.value}`;
          } else if (property.value.type === 'ObjectExpression') {
            return `'${property.key.name}': ${
              JSON.stringify(Parser.object(property.value))
                .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
                .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
            }`;
          } else if (property.value.type === 'ArrayExpression') {
            return `'${property.key.name}': ${
              JSON.stringify(Parser.array(property.value))
                .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
                .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
            }`;
          } else if (property.value.type === 'Identifier') {
            if (property.spread) {
              return `...${property.value.name}`;
            }
            return `'${property.key.name}': ${
              property.value.name
            }`;
          } else if (property.value.type === 'ProgramExpression') {
            return `'${property.key.name}': ${
              property.value.source
            }`;
          }
  
          return false;
        }).filter(Boolean).join(', ');
        expression += ' }, ';
      }
      if (token.children) {
        expression += this._bindings(
          token.children, 
          components, 
          level + 1, 
          total
        );
      }
      return expression;
    }).filter(Boolean).join('');

    if (level === 0) {
      return `{${attributes}}`;
    }

    return attributes;
  }

  /**
   * Generates the markup for a standard element
   */
  protected _markupElement(
    expression: string, 
    parent: MarkupToken|null,
    token: MarkupToken,
    components: Component[]
  ) {
    //check to see if the token refers to a 
    //component directly imported by this file
    const component = components.find(
      component => component.tagname === token.name
    );
    //if the token refers to a component imported by this file
    if (component) {
      if (component.type === 'template') {
        //templates take no children and scope is 
        //the same as the parent scope. template
        //tags are simply replaced with its children
        //syntax <x-head />
        //NOTE: if you want scoped templates, 
        // that's the same as a light component
        return expression + `...${this._markup(
          parent,
          component.ast.markup, 
          components
        )}`;
      }
      //business as usual
      expression += `TempleDocument.createComponent('${token.name}', {`;
    } else {
      //check to see if the token refers to a 
      //template in the registry
      const template = Object.values(this._component.registry).find(
        component => component.tagname === token.name 
          && component.type === 'template'
      );
      if (template) {
        //templates take no children and scope is 
        //the same as the parent scope. template
        //tags are simply replaced with its children
        //syntax <x-head />
        //NOTE: if you want scoped templates, 
        // that's the same as a light component
        return expression + `...${this._markup(
          parent,
          template.ast.markup, 
          components
        )}`;
      }
      expression += `TempleDocument.createElement('${token.name}', {`;
    }
    
    if (token.attributes && token.attributes.properties.length > 0) {
      expression += ' ' + token.attributes.properties.map(property => {
        if (property.value.type === 'Literal') {
          if (typeof property.value.value === 'string') {
            return `'${property.key.name}': \`${property.value.value}\``;
          }
          //null, true, false, number 
          return `'${property.key.name}': ${property.value.value}`;
        } else if (property.value.type === 'ObjectExpression') {
          return `'${property.key.name}': ${
            JSON.stringify(Parser.object(property.value))
              .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
              .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
          }`;
        } else if (property.value.type === 'ArrayExpression') {
          return `'${property.key.name}': ${
            JSON.stringify(Parser.array(property.value))
              .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
              .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
          }`;
        } else if (property.value.type === 'Identifier') {
          if (property.spread) {
            return `...${property.value.name}`;
          }
          return `'${property.key.name}': ${
            property.value.name
          }`;
        } else if (property.value.type === 'ProgramExpression') {
          return `'${property.key.name}': ${
            property.value.source
          }`;
        }

        return false;
      }).filter(Boolean).join(', ');
    }
    if (token.kind === 'inline') {
      expression += ' })';
    } else {
      expression += ' }, ';
      if (token.children) {
        expression += this._markup(token, token.children, components);
      }
      expression += `)`;
    }
    
    return expression;
  }
}