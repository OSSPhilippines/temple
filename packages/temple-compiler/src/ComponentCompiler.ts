//types
import {
  IdentifierToken,
  ComponentToken,
  MarkupToken,
  MarkupChildToken, 
  PropertyToken, 
  ScriptToken
} from '@ossph/temple-parser';
import type { 
  AST,
  Compiler,
  CompilerOptions,
  ComponentRegistry
} from './types';
//file systems
import fs from 'fs';
import path from 'path';
import FileLoader from './FileLoader';
//parsers/compilers
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import { DataParser, TempleParser } from '@ossph/temple-parser';
//helpers
import { camelize, slugify, serialize } from './helpers';
import Exception from './CompilerException';

/**
 * The Temple Compiler
 * 
 * Provides various methods to compile Temple source code to be used
 * as a template engine or a static site generator.
 */
export default class ComponentCompiler implements Compiler {
  //the absolute source file location
  protected _absolute: string;
  //cached AST
  protected _ast: AST|null = null;
  //prefix brand
  protected _brand: string;
  //build folder
  protected _build: string;
  //current working directory
  //we need this to locate and compile imported components
  protected _cwd: string;
  //file system to use
  protected _fs: typeof fs;
  //file loader helper
  protected _loader: FileLoader;
  //the tag name of the component
  protected _tagname: string;
  //whether to register the custom elements
  protected _register: boolean;
  //the compiled components cache
  protected _registry: ComponentRegistry;
  //the source file location
  protected _sourceFile: string;
  //tsconfig file
  protected _tsconfig: string|undefined;
  //type of the source file
  protected _type: 'document'|'component'|'template';
  
  /**
   * Returns abstract syntax tree
   */
  public get ast() {
    if (!this._ast) {
      //parse the source code
      this._ast = TempleParser.parse(this.contents);
    }

    return this._ast;
  }
  
  /**
   * Gets the absolute source file
   */
  public get absolute() {
    return this._absolute;
  }

  /**
   * Returns the source file basename
   */
  public get basename() {
    //determine class name
    return path.basename(
      this._sourceFile, 
      path.extname(this._sourceFile)
    );
  }

  /**
   * Gets the brand prefix
   */
  public get brand() {
    return this._brand;
  }

  /**
   * Returns the absolute path of the build folder
   */
  public get build() {
    return path.join(
      this._loader.absolute(this._build, this._cwd),
      this.id
    );
  }

  /**
   * Returns the class name (based on the basename)
   */
  public get classname() {
    return camelize(this.basename);
  }

  /**
   * Returns the compiled components directly 
   * imported by the main source file
   */
  public get components() {
    return this.ast.components.map(
      token => this._component(token)
    );
  }

  /**
   * Returns the source file contents
   */
  public get contents() {
    return this._fs.readFileSync(this._absolute, 'utf-8');
  }

  /**
   * Gets the current working directory
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * Gets the file system
   */
  public get fs() {
    return this._fs;
  }

  /**
   * Returns the unique id of the source file
   */
  public get id() {
    const relative = path.relative(this._cwd, this._sourceFile);
    return serialize(relative + this.tagname);
  }

  /**
   * Returns the tml imports information
   */
  public get imports() {
    return this.ast.imports.map(token => ({
      id: serialize(token.source.value),
      typeOnly: token.typeOnly,
      names: token.names?.map(name => name.value),
      default: token.default?.value,
      source: token.source.value
    }));
  }

  /**
   * Returns the file loader
   */
  public get loader() {
    return this._loader;
  }

  /**
   * Returns the compiled body script to put in template() 
   */
  public get markup() {
    return this._markup(this.ast.markup, this.components);
  }

  /**
   * Returns the present working directory
   */
  public get pwd() {
    return path.dirname(this.absolute);
  }

  /**
   * Returns true if the component is registered
   */
  public get register() {
    return this._register;
  }

  /**
   * Returns the relative path from the cwd
   */
  public get relative() {
    return path.relative(this.cwd, this.absolute);
  }

  /**
   * Returns the compiled scripts
   */
  public get scripts() {
    return this.ast.scripts.map(script => script.source);
  }

  /**
   * Gets the source file
   */
  public get sourceFile() {
    return this._sourceFile;
  }

  /**
   * Returns the compiled source code
   */
  public get sourceCode() {
    return this._generate();
  }

  /**
   * Returns the compiled styles
   */
  public get styles() {
    return this.ast.styles.map(style => style.source);
  }

  /**
   * Returns the tag name
   */
  public get tagname() {
    return this._tagname;
  }

  /**
   * Returns the location of the tsconfig file
   */
  public get tsconfig() {
    return this._tsconfig;
  }

  /**
   * Returns the type of source file
   */
  public get type() {
    return this._type;
  }

  /**
   * Sets the source code to compile
   */
  public constructor(
    sourceFile: string, 
    options: CompilerOptions,
    registry: ComponentRegistry = {}
  ) {
    //set the type
    this._type = options.type || 'component';
    //set the source file
    this._sourceFile = sourceFile;
    //set the file system
    this._fs = options.fs || fs;
    //set the current working directory
    this._cwd = options.cwd || process.cwd();
    //set the prefix brand
    this._brand = typeof options.brand === 'string'
      ? options.brand
      : 'temple';
    //determine the build folder
    this._build = options.build || './.temple';
    //by default, we register the custom elements
    this._register = options.register !== false;
    //file loader
    this._loader = new FileLoader(this._fs);
    //determine the tsconfig file
    this._tsconfig = this._loader.absolute(
      options.tsconfig || path.resolve(__dirname, '../tsconfig.json'), 
      this._cwd
    );
    //generated initializers
    this._absolute = this._loader.absolute(this._sourceFile, this._cwd);
    if (!this._fs.existsSync(this._absolute)) {
      throw Exception.for('File not found: %s', this._absolute);
    }
    //the component namespace
    this._tagname = slugify(options.name || this.basename);
    //set registry
    this._registry = registry;
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

    //if the component is not compiled yet
    if (!this._registry[id]) {
      //make a new compiler
      this._registry[id] = new ComponentCompiler(
        `./${relativeSourceFile}`,
        {
          fs: this._fs,
          cwd: this._cwd,
          brand: this._brand,
          register: false,
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
    //import { TempleDocument, TempleComponent } from '@ossph/temple-client';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple-client',
      namedImports: [ 'TempleDocument', 'TempleComponent' ]
    });
    //import Counter from './Counter'
    this.components.forEach(component => {
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
      statements: `${this.scripts.length > 0 
        ? this.scripts.join('\n')
        //allow scriptless components to use props
        : (`const props = this.props;`)}
        return () => ${this.markup.trim()};`
    });

    if (this._register) {
      //customElements.define('foo-bar', 'FoobarComponent');
      if (this._brand.length > 0) {
        source.addStatements(
          `customElements.define('${this._brand}-${this.tagname}', ${this.classname});`
        );
      } else {
        source.addStatements(
          `customElements.define('${this.tagname}', ${this.classname});`
        );
      }
    }

    return source;
  }

  /**
   * Determines the component name
   */
  protected _getComponentName(
    token: ComponentToken, 
    sourceFile: string
  ) {
    //the name is the basename by default
    let name = path.basename(
      sourceFile, 
      path.extname(sourceFile)
    )
    //get property attributes
    const properties = token.attributes.properties;
    //find name property
    const property = properties.find(
      property => property.key.name === 'name'
    );
    //if property is found
    if (property 
      //and the value type is a literal
      && property.value.type === 'Literal'
      //and the value is 'template'
      && typeof property.value.value === 'string'
    ) {
      name = property.value.value;
    }
    //return a slugified name
    return slugify(name);
  }

  /**
   * Determines the component type
   */
  protected _getComponentType(token: ComponentToken): 'component'|'template' {
    //get property attributes
    const properties = token.attributes.properties;
    //find type property
    const property = properties.find(
      property => property.key.name === 'type'
    );
    //if property is found
    if (property 
      //and the value type is a literal
      && property.value.type === 'Literal'
      //and the value is 'template'
      && property.value.value === 'template'
    ) {
      return 'template';
    }
    //it's component by default
    return 'component';
  }

  /**
   * Determines the tag name
   */
  protected _getTagName(token: MarkupToken) {
    return this._isComponent(token) && this._brand.length > 0
      ? `${this._brand}-${token.name}`
      : token.name; 
  }

  /**
   * Determines if the child is a component
   */
  protected _isComponent(token: MarkupToken) {
    return Object
      .values(this._registry)
      .find(component => component.tagname === token.name);
  }

  /**
   * Transforms markup to JS for the template() function
   */
  protected _markup(markup: MarkupChildToken[], components: Compiler[]) {
    return "[\n" + markup.map(child => {
      let expression = '';
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
      } else if (child.type === 'Literal') {
        if (typeof child.value === 'string') {
          expression += `TempleDocument.createText(\`${child.value}\`)`;
        //null, true, false, number 
        } else {
          expression += `TempleDocument.createText(String(${child.value}))`;
        }
      } else if (child.type === 'ProgramExpression') {
        expression += `...this._toNodeList(${child.source})`;
      }
      return expression;
    }).join(", \n") + "\n]";
  }

  /**
   * Generated the markup for a conditional statement
   */
  protected _markupConditional(token: MarkupToken, components: Compiler[]) {
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
  protected _markupElement(
    expression: string, 
    token: MarkupToken,
    components: Compiler[]
  ) {
    //check to see if the token refers to a component imported by this file
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
      const componentName = `${component.classname}_${component.id}`;
      expression += `TempleDocument.createComponent(${componentName}, {`;
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
      const tagName = this._getTagName(token); 
      expression += `TempleDocument.createElement('${tagName}', {`;
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
      expression += ' }).element';
    } else {
      expression += ' }, ';
      if (token.children) {
        expression += this._markup(token.children, components);
      }
      expression += `).element`;
    }
    
    return expression;
  }

  /**
   * Generates the markup for an iterator (each)
   */
  protected _markupIterator(token: MarkupToken, components: Compiler[]) {
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