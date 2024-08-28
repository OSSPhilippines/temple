//types
import type { MarkupToken, MarkupChildToken } from '../types';
import type Component from '../compiler/Component';
//file systems
import path from 'path';
//parsers
import { VariableDeclarationKind } from 'ts-morph';
import Parser from '../compiler/Parser';
import ComponentTranspiler from '../compiler/Transpiler';

export default class Transpiler extends ComponentTranspiler {
  /**
   * Generates document code to be used on the server
   */
  public transpile() {
    const { 
      absolute, 
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
    //  TempleDocument,
    //  TempleElement,  
    //  TempleRegistry
    //} from '@ossph/temple/server';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/server',
      namedImports: [
        'TempleDocument',
        'TempleElement',  
        'TempleRegistry'
      ]
    });
    //import others from <script>
    imports.forEach(imported => {
      const specifier = imported.source
        //replace client with server
        .replaceAll('@ossph/temple/client', '@ossph/temple/server')
        .replace(/^@ossph\/temple$/, '@ossph/temple/server');
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
    //export default class FoobarComponent extends TempleDocument
    const component = source.addClass({
      name: classname,
      extends: 'TempleDocument',
      isDefaultExport: true
    });
    //public id()
    component.addMethod({
      name: 'id',
      returnType: 'string',
      statements: `return '${this._component.id}';`
    });
    //public styles()
    component.addMethod({
      name: 'styles',
      returnType: 'string',
      statements: `return \`${styles.join('\n').trim()}\`;`
    });
    //public template()
    component.addMethod({
      name: 'template',
      statements: `
        ${scripts.join('\n')}
        return ${this.markup.trim()};
      `.trim()
    });

    return source;
  }

  /**
   * Returns a client script to be passed into the transpiled
   * render(client, props) method generated in transpile()
   */
  public client() {
    const { imports, scripts, ast } = this._component;
    //only components (vs templates)
    const components = this._component.components.filter(
      component => component.type === 'component'
    );
    //all components and sub components
    const registry = Object.values(this._component.registry).filter(
      component => component.type === 'component'
    )
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
    //import { TempleRegistry, emitter, data as __APP_DATA__ } from '@ossph/temple/client';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/client',
      namedImports: [ 
        'TempleRegistry', 
        'TempleException',
        'emitter', 
        'data as __APP_DATA__' 
      ]
    });
    //import Counter_abc123 from './Counter_abc123'
    registry.forEach(component => {
      let relative = path.relative(
        this._component.dirname, 
        component.absolute
      );
      if (!relative.startsWith('.')) {
        relative = `./${relative}`;
      }
      //now import
      source.addImportDeclaration({
        moduleSpecifier: relative,
        //we make sure there's no collisions
        //this is also matched when generating the component tree
        defaultImport: component.classname
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
      const script = document.querySelector('script[data-app]');
      if (!script) {
        throw TempleException.for('APP_DATA not found');
      }
      try {
        const data = atob(script.getAttribute('data-app'));
        window.__APP_DATA__ = JSON.parse(data);
        Object.entries(window.__APP_DATA__).forEach(([key, value]) => {
          __APP_DATA__.set(key, value);
        });
      } catch (error) {
        throw TempleException.for('APP_DATA is not a valid JSON');
      }
      //set the current component
      __APP_DATA__.set('current', 'document');
      //run the user entry script
      ${scripts.join('\n')}
      //reset the current component
      __APP_DATA__.delete('current');
      //now serialize the props
      //this is predicting the order rendered on the server
      //with the order determined by doc.body.querySelectorAll
      const __BINDINGS__: Record<string, Record<string, any>> = ${
        this._bindings(
          ast.markup, 
          this._component.components
        )
      };
      //loop through the initial elements before js manipulation
      for (const element of document.body.querySelectorAll('*')) {
        //pull the attributes from the rendered HTML
        const attributes: Hash = Object.fromEntries(
          Array.from(element.attributes).map(
            attribute => [ attribute.nodeName, attribute.nodeValue ]
          )
        );
        //determine the id of the element by its index in the registry
        const id = String(TempleRegistry.elements.size);
        //if the element has bindings
        if (__BINDINGS__[id]) {
          //this is where we need to add the bindings to the attributes
          Object.assign(attributes, __BINDINGS__[id]);
        }
        //finally add the element to the registry
        TempleRegistry.register(element, attributes);
      }
      //after we registered all the elements, we can now register the 
      //components and let it manip the HTML further if it wants to
      ${components.map(component => {
        const { tagname, classname } = component;
        return `customElements.define('${tagname}', ${classname});`
      }).join('\n')}
      //emit the mounted event
      emitter.emit('mounted', document.body);
    });`);

    //export { TempleComponent, TempleRegistry, ... } from '@ossph/temple/client';
    source.addExportDeclaration({
      moduleSpecifier: '@ossph/temple/client',
      namedExports: [
        'data',
        'props',
        'children',
        'signal', 
        'emitter',
        'TempleComponent', 
        'TempleRegistry', 
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
          ${registry.map(
            component => `'${component.classname}': ${component.classname}`
          ).join(',\n')}
        }`
      }]
    });

    // export const BUILD_ID = { ... }
    source.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [{
        name: 'BUILD_ID',
        initializer: `'${this._component.id}'`
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
      
      //business as usual...

      //create the component
      expression += `TempleRegistry.createElement('${token.name}', {`;
    } else {
      //check to see if the token refers to a 
      //template in the registry
      const template = this._component.components.find(
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
      expression += `TempleRegistry.createElement('${token.name}', {`;
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