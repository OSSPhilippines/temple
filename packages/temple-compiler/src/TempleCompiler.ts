//types
import {
  ComponentToken,
  IdentifierToken,
  ImportToken, 
  MarkupToken,
  MarkupChildToken, 
  PropertyToken, 
  ScriptToken,
  StyleToken,
} from '@ossph/temple-parser';
import type { 
  AST,
  GeneratedChunks,
  CompilerOptions,
  ComponentRegistry,
  ComponentChunks
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
 * 
 * - use body() to get the compiled body markup (usually for engine)
 * - use head() to get the compiled head markup (usually for engine)
 * - use markup() to get the generated HTML markup (all of it) 
 *   (usually for engine)
 * - use sourceCode() to get a pointer to compile the source code file
 *   (usually for static site generator)
 * - use manifest() to get a pointer to compile just the components  
 *   imports file (usually for engine)
 */
export default class TempleCompiler {
  //the absolute source file location
  protected _absolute: string;
  //prefix brand
  protected _brand: string;
  //current working directory
  //we need this to locate and compile imported components
  protected _cwd: string;
  //file system to use
  protected _fs: typeof fs;
  //the compiled components cache
  protected _registry: ComponentRegistry = {};
  //the source file location
  protected _sourceFile: string;
  //cached AST
  protected _ast: AST|null = null;
  //build folder
  protected _buildFolder: string;
  //tsconfig file
  protected _tsconfig: string|undefined;
  //register children
  protected _registerChildren: boolean;

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
   * Returns the compiled body markup
   */
  public get body() {
    return this._body(this.ast.markup);
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
  public get buildFolder() {
    return path.join(
      FileLoader.absolute(this._buildFolder, this._cwd),
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
    return this._components(
      this._absolute, 
      this.ast.components,
      this._registerChildren ? 0 : 1
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
   * Returns the compiled head markup
   */
  public get head() {
    return this._head(this.ast.markup);
  }

  /**
   * Returns the unique id of the source file
   */
  public get id() {
    return serialize(path.relative(this._cwd, this._sourceFile));
  }

  /**
   * Returns the tml imports information
   */
  public get imports() {
    return this._imports(this.ast.imports);
  }

  /**
   * Returns a compiled source code for just imports
   * (normally for engine)
   */
  public get manifest() {
    return this._manifest(this.components);
  }

  /**
   * Returns the proper HTML markup (normally for engine)
   */
  public get markup() {
    return this._markup(this.ast.markup);
  }

  /**
   * Gets the compiled components
   */
  public get registry() {
    return Object.values(this._registry);
  }

  /**
   * Returns the compiled scripts
   */
  public get scripts() {
    return this._scripts(this.ast.scripts);
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
    return this._generate({
      name: {
        tag: this.tagname,
        component: this.classname
      },
      path: {
        source: this._sourceFile,
        absolute: this._absolute
      },
      components: this.components,
      imports: this.imports,
      scripts: this.scripts,
      styles: this.styles,
      template: this.template
    }, true);
  }

  /**
   * Returns the compiled styles
   */
  public get styles() {
    return this._styles(this.ast.styles);
  }

  /**
   * Returns the tag name
   */
  public get tagname() {
    return slugify(this.basename);
  }

  /**
   * Returns the compiled body script to put in template() 
   */
  public get template() {
    return this._template(this.ast.markup, this.components);
  }

  /**
   * Returns the location of the tsconfig file
   */
  public get tsconfig() {
    return this._tsconfig;
  }

  /**
   * Sets the source code to compile
   */
  public constructor(sourceFile: string, options: CompilerOptions) {
    //set the source file
    this._sourceFile = sourceFile;
    //set the file system
    this._fs = options.fs || fs;
    //set the current working directory
    this._cwd = options.cwd || process.cwd();
    //set the prefix brand
    this._brand = options.brand || 'x';
    //determine the build folder
    this._buildFolder = options.buildFolder || './.temple';
    //register children (default true)
    this._registerChildren = options.registerChildren !== false;
    //determine the tsconfig file
    this._tsconfig = FileLoader.absolute(
      options.tsconfig || path.resolve(__dirname, '../tsconfig.json'), 
      this._cwd
    );
    //generated initializers
    this._absolute = FileLoader.absolute(this._sourceFile, this._cwd);
    if (!this._fs.existsSync(this._absolute)) {
      throw Exception.for('File not found: %s', this._absolute);
    }
  }

  /**
   * Generates dependency chunks
   */
  public dependency(sourceFile: string, cwd: string, level = 0) {
    const absoluteSourceFile = FileLoader.absolute(sourceFile, cwd);
    if (!this._fs.existsSync(absoluteSourceFile)) {
      throw Exception.for('File not found: %s', absoluteSourceFile);
    }
    //determine class name
    const basename = path.basename(sourceFile, path.extname(sourceFile));
    //determine slug
    const tagname = slugify(basename);
    //determine camel (capitalized)
    const classname = camelize(basename);  
    //load the source code
    const sourceCode = this._fs.readFileSync(absoluteSourceFile, 'utf-8');
    //parse the source code
    const ast = TempleParser.parse(sourceCode);
    const components = this._components(
      absoluteSourceFile, 
      ast.components, 
      level + 1
    );
    const imports = this._imports(ast.imports);
    const scripts = this._scripts(ast.scripts);
    const styles = this._styles(ast.styles);
    const template = this._template(ast.markup, components);
    //generate a build id
    const id = serialize(path.relative(this._cwd, sourceFile));
    //generate the code
    const source = this._generate({
      name: {
        tag: tagname,
        component: classname
      },
      path: {
        source: this._sourceFile,
        absolute: this._absolute
      },
      components,
      imports,
      scripts,
      styles,
      template
    }, level === 0);

    return {
      id,
      name: {
        tag: tagname,
        component: classname
      },
      path: {
        source: sourceFile,
        absolute: absoluteSourceFile
      },
      source
    };
  }

  /**
   * Generates the body markup
   */
  protected _body(markup: MarkupToken[]) {
    if (markup.length === 0
      || markup[0].type !== 'MarkupExpression' 
      || markup[0].name !== 'html'
    ) {
      return ''
    }

    const html = markup[0];
    if (!html.children || html.children.length === 0) {
      return '';
    }

    let body: MarkupToken|null = null;
    html.children.forEach(child => {
      if (child.type === 'MarkupExpression' && child.name === 'body') {
        body = child;
      }
    });

    if (body === null) {
      return '';
    }

    return this._markup((body as MarkupToken).children || []);
  }

  /**
   * Returns the compiled components
   */
  protected _components(
    sourceFile: string, 
    components: ComponentToken[],
    level = 0
  ) {
    return components.map(token => {
      //find the absolute file path relative to this file
      const inputSourceFile = FileLoader.route(
        sourceFile,
        token.source.value
      );

      // This will also be used as the key name because it's the best 
      // way to make sure the component is unique because it's possible 
      // for components to have the same name it's also possible for 
      // components to have the tag name (although rare)

      //if the component is not compiled yet
      if (!this._registry[inputSourceFile]) {
        //compile it
        this._registry[inputSourceFile] = this.dependency(
          token.source.value, 
          path.dirname(sourceFile),
          level
        );
      }
      //return the compiled component
      return this._registry[inputSourceFile];
    });
  }

  /**
   * Generates code
   */
  protected _generate(chunks: GeneratedChunks, register = false) {
    const { 
      name,
      path: componentsPath,
      components, 
      imports, 
      scripts, 
      styles, 
      template 
    } = chunks;
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
    const extname = path.extname(componentsPath.absolute);
    const filePath = componentsPath.absolute.slice(0, -extname.length);
    //create a new source file
    const source = project.createSourceFile(`${filePath}.ts`);
    //import { TempleElement, TempleComponent } from '@ossph/temple-client'
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple-client',
      namedImports: [ 'TempleElement', 'TempleComponent' ]
    });
    //import Counter from './Counter'
    components.forEach(component => {
      //now import
      source.addImportDeclaration({
        moduleSpecifier: `./${component.name.component}_${component.id}`,
        //we make sure there's no collisions
        //this is also matched when generating the component tree
        defaultImport: `${component.name.component}_${component.id}`
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
    //export default class FoobarComponent extends TempleComponent
    const component = source.addClass({
      name: name.component,
      extends: 'TempleComponent',
      isDefaultExport: true,
    });
    //public static component = ['foo-bar', 'FoobarComponent'];
    component.addProperty({
      name: 'component',
      isStatic: true,
      initializer: `[ '${name.tag}', '${name.component}' ] as [ string, string ]`
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
      statements: `${scripts.join('\n')}\nreturn () => ${template.trim()};`
    });

    if (register) {
      //customElements.define('foo-bar', 'FoobarComponent');
      source.addStatements(
        `customElements.define('${this._brand}-${name.tag}', ${name.component});`
      );
    }

    return source;
  }

  /**
   * Generates the head markup
   */
  protected _head(markup: MarkupToken[]) {
    if (markup.length === 0
      || markup[0].type !== 'MarkupExpression' 
      || markup[0].name !== 'html'
    ) {
      return ''
    }

    const html = markup[0];
    if (!html.children || html.children.length === 0) {
      return '';
    }

    let head: MarkupToken|null = null;
    html.children.forEach(child => {
      if (child.type === 'MarkupExpression' && child.name === 'head') {
        head = child;
      }
    });

    if (head === null) {
      return '';
    }

    return this._markup((head as MarkupToken).children || []);
  }

  /**
   * Returns the compiled imports
   */
  protected _imports(imports: ImportToken[]) {
    return imports.map(token => ({
      id: serialize(token.source.value),
      typeOnly: token.typeOnly,
      names: token.names?.map(name => name.value),
      default: token.default?.value,
      source: token.source.value
    }));
  }

  /**
   * Returns a compiled source code for just imports
   * (normally for engine)
   */
  protected _manifest(components: ComponentChunks[]) {
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
    //create a new source file
    const source = project.createSourceFile('manifest.ts');
    components.forEach(component => {
      //import './components/Counter_abc123'
      source.addImportDeclaration({
        moduleSpecifier: `./components/${component.name.component}_${component.id}`
      });
    });

    return source;
  }

  /**
   * Generates the markup
   */
  protected _markup(markup: MarkupChildToken[]) {
    return markup.map(child => {
      let expression = '';
      if (child.type === 'MarkupExpression') { 
        expression += this._markupTag(child);
      } else if (child.type === 'Literal') {
        expression += child.value;
      } else if (child.type === 'ProgramExpression') {
        expression += `\${${child.source}}`;
      }
      return expression;
    }).join('');
  }

  /**
   * Returns the compiled scripts
   */
  protected _scripts(scripts: ScriptToken[]) {
    return scripts.map(script => script.source);
  }

  /**
   * Returns the compiled styles
   */
  protected _styles(styles: StyleToken[]) {
    return styles.map(style => style.source);
  }

  /**
   * Transforms markup to JS for the template() function
   */
  protected _template(
    markup: MarkupChildToken[], 
    components: ComponentChunks[]
  ) {
    return "[\n" + markup.map(child => {
      let expression = '';
      if (child.type === 'MarkupExpression') {
        if (child.name === 'if') {
          //syntax <if true={count > 1}>...</if>
          return this._templateConditional(child, components);
        } else if (child.name === 'each') {
          //syntax <each value=item key=i from=list>...</each>
          return this._templateIterator(child, components);
        }
        //syntax <div title="Some Title">...</div>
        expression += this._templateElement(expression, child, components);
      } else if (child.type === 'Literal') {
        if (typeof child.value === 'string') {
          expression += `document.createTextNode(\`${child.value}\`)`;
        //null, true, false, number 
        } else {
          expression += `document.createTextNode(String(${child.value}))`;
        }
      } else if (child.type === 'ProgramExpression') {
        expression += `document.createTextNode(String(${child.source}))`;
      }
      return expression;
    }).join(", \n") + "\n]";
  }

  /**
   * Determines if the child is a component
   */
  private _isComponent(token: MarkupToken) {
    return Object
      .values(this._registry)
      .find(component => component.name.tag === token.name);
  }

  /**
   * Generates the markup for an attribute
   */
  private _markupAttribute(property: PropertyToken) {
    if (property.value.type === 'Literal') {
      if (typeof property.value.value === 'string') {
        return `${property.key.name}="${property.value.value}"`;
      }
      //null, true, false, number
      return `${property.key.name}="data:${
        property.value.value
      }"`;
    } else if (property.value.type === 'Identifier') {
      return `${property.key.name}="prop:${
        property.value.name
      }"`;
    } else if (property.value.type === 'ProgramExpression') {
      return `${property.key.name}=\${${property.value.source}}`;
    }
    return false;
  }

  /**
   * Generates the markup for a tag
   */
  private _markupTag(token: MarkupToken) {
    const tagName = this._tagName(token); 
    let expression = `<${tagName}`;
    if (token.attributes && token.attributes.properties.length > 0) {
      expression += ' ' + token.attributes.properties
        .map(this._markupAttribute)
        .filter(Boolean)
        .join(' ');
    }
    if (token.kind === 'inline' && !this._isComponent(token)) {
      expression += ' />';
    } else {
      expression += '>';
      if (token.children) {
        expression += this._markup(token.children);
      }
      expression += `</${tagName}>`;
    }
    return expression;
  }

  /**
   * Determines the tag name
   */
  private _tagName(token: MarkupToken) {
    return this._isComponent(token)
      ? `${this._brand}-${token.name}`
      : token.name; 
  }

  /**
   * Generated the markup for a conditional statement
   */
  private _templateConditional(
    token: MarkupToken, 
    components: ComponentChunks[]
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
      expression += this._template(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ' : [])';
    return expression;
  }

  /**
   * Generates the markup for a standard element
   */
  private _templateElement(
    expression: string, 
    token: MarkupToken,
    components: ComponentChunks[]
  ) {
    //check to see if the token refers to a component imported by this file
    const instance = components.find(
      component => component.name.tag === token.name
    );
    //if the token refers to a component imported by this file
    if (instance) {
      const componentName = `${instance.name.component}_${instance.id}`;
      expression += `TempleElement.localize(${componentName}, {`;
    } else {
      const tagName = this._tagName(token); 
      expression += `TempleElement.create('${tagName}', {`;
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
        expression += this._template(token.children, components);
      }
      expression += `).element`;
    }
    
    return expression;
  }

  /**
   * Generates the markup for an iterator (each)
   */
  private _templateIterator(token: MarkupToken, components: ComponentChunks[]) {
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
      expression += this._template(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ').flat()';
    return expression;
  }
}