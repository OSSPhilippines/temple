import type { 
  ComponentToken,
  MarkupToken, 
  MarkupChildToken 
} from '@ossph/temple-parser';
import type { Compiler, CompilerOptions } from './types';

import path from 'path';
import ts from 'typescript';
import { Project, IndentationText, VariableDeclarationKind } from 'ts-morph';
import { DataParser } from '@ossph/temple-parser';
import ComponentCompiler from './ComponentCompiler';
import { serialize } from './helpers';

export default class DocumentCompiler extends ComponentCompiler {
  /**
   * Returns a compiled source code for just imports
   * (normally for engine)
   */
  public get manifest() {
    const components = this.components;
    //make a new project
    const project = new Project({
      tsConfigFilePath: this.tsconfig,
      skipAddingFilesFromTsConfig: true,
      compilerOptions: {
        outDir: this.build,
        // Generates corresponding '.d.ts' file.
        declaration: true, 
        // Generates a sourcemap for each corresponding '.d.ts' file.
        declarationMap: true, 
        // Generates corresponding '.map' file.
        sourceMap: true, 
        // Set the target JavaScript version
        target: ts.ScriptTarget.ESNext,  
        // Set the module system
        module: ts.ModuleKind.CommonJS
      },
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces
      }
    });
    //create a new source file
    const source = project.createSourceFile('manifest.ts');
    components.forEach(component => {
      //import './Counter_abc123'
      source.addImportDeclaration({
        moduleSpecifier: `./${component.classname}_${component.id}`,
        defaultImport: `${component.classname}_${component.id}`
      });
    });

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
   * Gets the compiled components
   */
  public get registry() {
    return Object.values(this._registry);
  }

  /**
   * Sets the source code to compile
   */
  public constructor(sourceFile: string, options: CompilerOptions) {
    super(sourceFile, options);
    //set the type
    this._type = options.type || 'document';
    //by default, we dont register the custom elements
    this._register = options.register === true;
  }

  /**
   * Collect all the identifiers in markup so we know
   * what to pass in window.__BINDINGS__
   * object. We also need to get the component ids in order
   * of discovered.
   */
  protected _bindings(
    markup: MarkupChildToken[], 
    components: Compiler[],
    level = 0,
    total = { current: 0 }
  ) {
    const attributes = markup.map(token => {
      let expression = '';
      if (token.type !== 'MarkupExpression') {
        return expression;
      }

      if (token.name === 'if' || token.name === 'each') {
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
      //we only hydrate components
      if (!child || child.type === 'template') {
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
      const id = ++total.current;
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
              JSON.stringify(DataParser.object(property.value))
                .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
                .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
            }`;
          } else if (property.value.type === 'ArrayExpression') {
            return `'${property.key.name}': ${
              JSON.stringify(DataParser.array(property.value))
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
   * Returns the compiled component directly 
   * imported by the main source file
   */
  protected _component(token: ComponentToken) {
    //if the source file is prefixed with @/
    const inputSourceFile = token.source.value.startsWith('@/')
      //find the absolute file path relative to cwd
      ? this._loader.absolute(
        token.source.value.replace('@/', './'),
        this.cwd
      )
      //find the absolute file path relative to this file 
      : this._loader.absolute(
        token.source.value,
        this.pwd
      );
    
    //now find the relative path to the cwd
    const relativeSourceFile = path.relative(this._cwd, inputSourceFile);
    // This will also be used as the key name because it's the best 
    // way to make sure the component is unique because it's possible 
    // for components to have the same name it's also possible for 
    // components to have the tag name (although rare)

    const name = this._getComponentName(token, inputSourceFile);
    const type = this._getComponentType(token);
    const id = serialize(relativeSourceFile + name);
    const register = type === 'component' && this._register === false;

    //if the component is not compiled yet
    if (!this._registry[id]) {
      //make a new compiler
      this._registry[id] = new ComponentCompiler(
        `./${relativeSourceFile}`,
        {
          fs: this._fs,
          cwd: this._cwd,
          brand: this._brand,
          register: register,
          build: this._build,
          tsconfig: this._tsconfig,
          name: name,
          type: type
        },
        this._registry
      );
      //call components to render
      this._registry[id].components;
    }
    //return the compiled component
    return this._registry[id];
  }
  
  /**
   * Generates code
   */
  protected _generate() {
    //if we are suppose to register this to customElements
    //it means we want to treat this as any other web component
    if (this._register) {
      return super._generate();
    }

    const markup = this.ast.markup;
    const components = this.components;
    //make a new project
    const project = new Project({
      tsConfigFilePath: this.tsconfig,
      skipAddingFilesFromTsConfig: true,
      compilerOptions: {
        outDir: this.build,
        // Generates corresponding '.d.ts' file.
        declaration: true, 
        // Generates a sourcemap for each corresponding '.d.ts' file.
        declarationMap: true, 
        // Generates corresponding '.map' file.
        sourceMap: true, 
        // Set the target JavaScript version
        target: ts.ScriptTarget.ESNext,  
        // Set the module system
        module: ts.ModuleKind.CommonJS
      },
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces
      }
    });
    //get path without extension
    //ex. /path/to/Counter.tml -> /path/to/Counter
    const extname = path.extname(this._absolute);
    const filePath = this._absolute.slice(0, -extname.length);
    //create a new source file
    const source = project.createSourceFile(`${filePath}.ts`);
    //import { 
    //  data,
    //  TempleElement, 
    //  TempleText, 
    //  TempleDocument, 
    //  TempleException 
    //} from '@ossph/temple-server';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple-server',
      namedImports: [
        'data as __APP_DATA__',
        'TempleElement', 
        'TempleText', 
        'TempleDocument', 
        'TempleException'
      ]
    });
    //import others from <script>
    this.imports.forEach(imported => {
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
    //TempleDocument.brand = 'temple';
    source.addStatements(`TempleDocument.brand = '${this._brand}';`);
    //export default class FoobarComponent
    const component = source.addClass({
      name: `${this.classname}_${this.id}`,
      isDefaultExport: true,
    });
    //public props: Record<string, any> = {}
    component.addProperty({
      name: 'props',
      type: 'Record<string, any>',
      initializer: '{}'
    });
    //public style()
    component.addMethod({
      name: 'styles',
      returnType: 'string',
      statements: `return \`${this.styles.join('\n').trim()}\`;`
    });
    //public template()
    component.addMethod({
      name: 'template',
      statements: `
        ${this.scripts.length > 0 
          ? this.scripts.join('\n')
          : `const props = __APP_DATA__.get('props') || {};`
        }
        __APP_DATA__.set('bindings', ${
          this._bindings(markup, components)
        });
        return ${this._markup(markup, components)};
      `
    });
    //public render()
    component.addMethod({
      name: 'render',
      //script?: string, props?: Record<string, any>
      parameters: [ 
        { name: 'script?', type: 'string' }, 
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
        //reset the current component before validating
        __APP_DATA__.remove('current');
        
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
            __APP_DATA__.get()
          )};</\${tags.script}></\${tags.head}>\`
        );
        if (script && script.length > 0) {
          //add script to the head
          document = document.replace(
            \`</\${tags.head}>\`, 
            \`<\${tags.script} class="templejs">\${script}</\${tags.script}></\${tags.head}>\`
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
        return \`<!DOCTYPE html>\${document}\`;
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
   * Generates the markup for a standard element
   */
  protected _markupElement(
    expression: string, 
    token: MarkupToken,
    components: Compiler[]
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
          component.ast.markup, 
          components
        )}`;
      }
      //business as usual
      expression += `TempleDocument.createComponent('${token.name}', {`;
    } else {
      //check to see if the token refers to a 
      //template in the registry
      const template = Object.values(this._registry).find(
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
            JSON.stringify(DataParser.object(property.value))
              .replace(/"([a-zA-Z0-9_]+)":/g, "$1:")
              .replace(/"\${([a-zA-Z0-9_]+)}"/g, "$1")
          }`;
        } else if (property.value.type === 'ArrayExpression') {
          return `'${property.key.name}': ${
            JSON.stringify(DataParser.array(property.value))
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
        expression += this._markup(token.children, components);
      }
      expression += `)`;
    }
    
    return expression;
  }
}