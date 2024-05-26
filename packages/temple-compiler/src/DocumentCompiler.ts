import type { MarkupChildToken } from '@ossph/temple-parser';
import type { Compiler, CompilerOptions } from './types';

import path from 'path';
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import FileLoader from './FileLoader';
import ComponentCompiler from './ComponentCompiler';
import { DataParser } from '@ossph/temple-parser';

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
            buildFolder: this._buildFolder,
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
   * what to pass in __BINDINGS__ prop in __GLOBAL_PROPS__
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

    const components = this.components;
    //make a new project
    const project = new Project({
      tsConfigFilePath: this.tsconfig,
      skipAddingFilesFromTsConfig: true,
      compilerOptions: {
        outDir: this.buildFolder,
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
    //import { TempleElement, TempleComponent } from '@ossph/temple-client'
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple-client',
      namedImports: [ 
        'TempleElement', 
        'TempleComponent', 
        'globals', 
        'bindings',
        'globalNamespace',
        'bindingNamespace'
      ]
    });
    //import Counter from './Counter'
    components.forEach(component => {
      //now import
      source.addImportDeclaration({
        moduleSpecifier: `./${component.classname}_${component.id}`,
        //we make sure there's no collisions
        //this is also matched when generating the component tree
        defaultImport: `${component.classname}_${component.id}`
      });
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
    //TempleElement.brand = 'temple';
    source.addStatements(`TempleElement.brand = '${this._brand}';`);
    //export default class FoobarComponent extends TempleComponent
    const component = source.addClass({
      name: this.classname,
      extends: 'TempleComponent',
      isDefaultExport: true,
    });
    //public static component = ['foo-bar', 'FoobarComponent'];
    component.addProperty({
      name: 'component',
      isStatic: true,
      initializer: `[ '${this.tagname}', '${this.classname}' ] as [ string, string ]`
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
          : (`const props = globals.data;`)}
        bindings.data = ${
          this._bindings(this.ast.markup, components)
        };
        return () => ${this.template.trim()};
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
        //if there are props
        if (props) {
          globals.data = props;
        }
        //set the current component
        TempleComponent._current = this;
        //get the styles
        const styles = this.styles();
        //get the template
        if (!this._template) {
          //this will only initialize the variables once
          this._template = this.template();
        }
        //get the children build w/o re-initializing the variables
        const children = this._template().filter(Boolean) as Element[];
        //reset the current component before validating
        TempleComponent._current = null;
        this._initiated = true;
        //check if the root element is an <html> tag
        if (children.length !== 1 
          || children[0].nodeName.toLowerCase() !== 'html'
        ) {
          throw TempleException.for('Document must have an <html> tag.');
        }
        
        //we are good to go...
        //NOTE: in document there is no shadow dom
        //so there's no need to case for it...
    
        //used to prevent the browser from 
        //misinterpretting these tags
        const tags = {
          head: 'head',
          script: 'script',
          style: 'style'
        }
    
        //append the children
        this.textContent = '';
        children.forEach(child => this.appendChild(child));
        //this is the <html> tag
        let document = this.innerHTML;
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
          \`<\${tags.script}>window.\${globalNamespace}=\${JSON.stringify(
            globals.data
          )};
          window.\${bindingNamespace}=\${JSON.stringify(
            bindings.data
          )};</\${tags.script}></\${tags.head}>\`
        );
        if (script && script.length > 0) {
          //add script to the head
          document = document.replace(
            \`</\${tags.head}>\`, 
            \`<\${tags.script}>\${script}</\${tags.script}></\${tags.head}>\`
          );
        }
        //prettify document
        document = document.replace(
          \`</\${tags.head}>\`, 
          \`<\${tags.script}>Array.from(
            document.head.getElementsByTagName('\${tags.script}')
          ).forEach(s => s.remove());
          </\${tags.script}></\${tags.head}>\`
        );
        //return the full html
        return \`<!DOCTYPE html>\${document}\`;
      `)
    });

    return source;
  }
}