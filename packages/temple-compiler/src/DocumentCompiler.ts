import type { 
  IdentifierToken,
  PropertyToken,
  ScriptToken,
  MarkupToken, 
  MarkupChildToken 
} from '@ossph/temple-parser';
import type { Compiler, CompilerOptions } from './types';

import path from 'path';
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import FileLoader from './FileLoader';
import ComponentCompiler from './ComponentCompiler';
import { DataParser } from '@ossph/temple-parser';
import Exception from './CompilerException';

export default class DocumentCompiler extends ComponentCompiler {
  /**
   * Returns the compiled components directly 
   * imported by the main source file
   */
  public get components() {
    return this.ast.components.map(token => {
      //find the absolute file path relative to this file
      const inputSourceFile = FileLoader.route(
        this._absolute,
        token.source.value
      );
      //now find the relative path to the cwd
      const relativeSourceFile = path.relative(this._cwd, inputSourceFile);
      // This will also be used as the key name because it's the best 
      // way to make sure the component is unique because it's possible 
      // for components to have the same name it's also possible for 
      // components to have the tag name (although rare)

      //if the component is not compiled yet
      if (!this._registry[inputSourceFile]) {
        //make a new compiler
        this._registry[inputSourceFile] = new ComponentCompiler(
          `./${relativeSourceFile}`,
          {
            fs: this._fs,
            cwd: this._cwd,
            brand: this._brand,
            register: this._register === false,
            build: this._build,
            tsconfig: this._tsconfig
          },
          this._registry
        );
        //call components to render
        this._registry[inputSourceFile].components;
      }
      //return the compiled component
      return this._registry[inputSourceFile];
    });
  }

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
        moduleSpecifier: `./${component.classname}_${component.id}`
      });
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
    total = 0
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
      //check to see if the token refers to a component imported by this file
      const child = components.find(
        component => component.tagname === token.name
      );
      //we only hydrate components
      if (!child) {
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
      const id = ++total;
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
   * Transforms markup to a parsable DOM tree without 
   * triggering the component renders (for the server)
   */
  protected _markup(
    markup: MarkupChildToken[], 
    components: Compiler[]
  ) {
    return "[\n" + markup.map(child => {
      let expression = '';
      //if new markup
      if (child.type === 'MarkupExpression') {
        if (child.name === 'if') {
          //syntax <if true={count > 1}>...</if>
          return this._markupConditional(child, components);
        } else if (child.name === 'each') {
          //syntax <each value=item key=i from=list>...</each>
          return this._markupIterator(child, components);
        }
        //syntax <div title="Some Title">...</div>
        expression += this._markupElement(expression, child, components);
      //if child text
      } else if (child.type === 'Literal') {
        if (typeof child.value === 'string') {
          expression += `TempleDocument.createText(\`${child.value}\`)`;
        //null, true, false, number 
        } else {
          expression += `TempleDocument.createText(String(${child.value}))`;
        }
      //if child expression
      } else if (child.type === 'ProgramExpression') {
        expression += `...this._toNodeList(${child.source})`;
      }
      return expression;
    }).join(", \n") + "\n]";
  }

  /**
   * Generated the markup for a conditional statement
   */
  private _markupConditional(
    token: MarkupToken, 
    components: Compiler[]
  ) {
    let expression = '';
    //syntax <if true={count > 1}>...</if>
    if (!token.attributes 
      || token.attributes.properties.length === 0 
    ) {
      throw Exception.for('Invalid if statement');
    }
    const truesy = token.attributes.properties.find(
      property => property.key.name === 'true'
    );
    const falsesy = token.attributes.properties.find(
      property => property.key.name === 'false'
    );
    if (!truesy && !falsesy) {
      throw Exception.for('Invalid if statement');
    }
    expression += '...(!';
    if (truesy) {
      expression += '!';
    }
    const property = (truesy || falsesy) as PropertyToken;
    if (property.value.type === 'ProgramExpression') {
      const script = property.value as ScriptToken;
      expression += `(${script.source}) ? `;
    } else if (property.value.type === 'Literal') {
      if (typeof property.value.value === 'string') {
        expression += `('${property.value.value}') ? `;
      } else {
        expression += `(${property.value.value}) ? `;
      }
    } else if (property.value.type === 'Identifier') {
      expression += `(${property.value.name}) ? `;
    } else {
      throw Exception.for('Invalid if statement');
    }
    
    if (token.children) {
      expression += this._markup(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ' : [])';
    return expression;
  }

  /**
   * Generates the markup for a standard element
   */
  private _markupElement(
    expression: string, 
    token: MarkupToken,
    components: Compiler[]
  ) {
    //check to see if the token refers to a component imported by this file
    const instance = components.find(
      component => component.tagname === token.name
    );
    //if the token refers to a component imported by this file
    if (instance) {
      expression += `TempleDocument.createComponent('${token.name}', {`;
    } else {
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

  /**
   * Generates the markup for an iterator (each)
   */
  private _markupIterator(token: MarkupToken, components: Compiler[]) {
    let expression = '';
    //syntax <each value=item key=i from=list>...</each>
    if (!token.attributes 
      || token.attributes.properties.length === 0 
    ) {
      throw Exception.for('Invalid each statement');
    }
    const key = token.attributes.properties.find(
      property => property.key.name === 'key'
    );
    const value = token.attributes.properties.find(
      property => property.key.name === 'value'
    );
    const from = token.attributes.properties.find(
      property => property.key.name === 'from'
    );
    if (!from || (!key && !value)) {
      throw Exception.for('Invalid each statement');
    } else if (key && key.value.type !== 'Identifier') {
      throw Exception.for('Invalid key value in each');
    } else if (value && value.value.type !== 'Identifier') {
      throw Exception.for('Invalid value in each');
    }
    const keyName = (key?.value as IdentifierToken)?.name || '_';
    const valueName = (value?.value as IdentifierToken)?.name || '_';
    expression += `...`;
    if (from.value.type === 'ProgramExpression') {
      const script = from.value as ScriptToken;
      expression += `Object.entries(${script.source})`;
    } else if (from.value.type === 'ArrayExpression') {
      expression += `Object.entries(${
        JSON.stringify(DataParser.array(from.value))
      })`;
    } else if (from.value.type === 'ObjectExpression') {
      expression += `Object.entries(${
        JSON.stringify(DataParser.object(from.value))
      })`;
    } else if (from.value.type === 'Identifier') {
      expression += `Object.entries(${from.value.name})`;
    } else {
      throw Exception.for('Invalid from value in each');
    }
    expression += `.map(([${keyName}, ${valueName}]) => `;
    if (token.children) {
      expression += this._markup(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ').flat()';
    return expression;
  }
}