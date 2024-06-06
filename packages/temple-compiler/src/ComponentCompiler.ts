//types
import {
  ComponentToken,
  MarkupToken,
  MarkupChildToken
} from '@ossph/temple-parser';
import type DirectiveInterface from './directives/DirectiveInterface';
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
import { DataParser, TempleParser } from '@ossph/temple-parser';
//directives
import { 
  IfDirective,
  ElifDirective,
  ElseDirective
} from './directives/ConditionalDirective';
import { 
  TryDirective,
  CatchDirective
} from './directives/TryCatchDirective';
import IteratorDirective from './directives/IteratorDirective';
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
  //current working directory
  //we need this to locate and compile imported components
  protected _cwd: string;
  //directive registry
  protected _directives = new Map<string, DirectiveInterface>();
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
    return this._markup(null, this.ast.markup, this.components);
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
    //by default, we register the custom elements
    this._register = options.register !== false;
    //file loader
    this._loader = new FileLoader(this._fs);
    //generated initializers
    this._absolute = this._loader.absolute(this._sourceFile, this._cwd);
    if (!this._fs.existsSync(this._absolute)) {
      throw Exception.for('File not found: %s', this._absolute);
    }
    //the component namespace
    this._tagname = slugify(options.name || this.basename);
    //set registry
    this._registry = registry;
    //add directives
    this.directive(new IfDirective(this));
    this.directive(new ElifDirective(this));
    this.directive(new ElseDirective(this));
    this.directive(new TryDirective(this));
    this.directive(new CatchDirective(this));
    this.directive(new IteratorDirective(this));
  }

  /**
   * Adds a directive to the compiler
   */
  public directive(directive: DirectiveInterface) {
    this._directives.set(directive.name, directive);
    return this;
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
  protected _markup(
    parent: MarkupToken|null,
    markup: MarkupChildToken[], 
    components: Compiler[]
  ): string {
    return "[\n" + markup.map(child => {
      let expression = '';
      if (child.type === 'MarkupExpression') {
        if (this._directives.has(child.name)) {
          const directive = this._directives.get(child.name) as DirectiveInterface;
          return directive.markup(parent, child, components, this._markup.bind(this));
        }
        //syntax <div title="Some Title">...</div>
        expression += this._markupElement(expression, parent, child, components);
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
   * Generates the markup for a standard element
   */
  protected _markupElement(
    expression: string, 
    parent: MarkupToken|null,
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
          parent,
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
          parent,
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
        expression += this._markup(token, token.children, components);
      }
      expression += `).element`;
    }
    
    return expression;
  }
}