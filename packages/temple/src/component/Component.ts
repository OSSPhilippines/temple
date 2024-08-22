//types
import type FSInterface from '../filesystem/FSInterface';
import type { AST, ComponentOptions } from './types';
//filesystem
import path from 'path';
import FileLoader from '../filesystem/FileLoader';
import FileSystem from '../filesystem/FileSystem';
//parsers/compilers
import Tokenizer from './Tokenizer';
//helpers
import { camelize, encrypt, slugify } from './helpers';

/**
 * The Temple Compiler
 * 
 * Provides various methods to compile Temple source code to be used
 * as a template engine or a static site generator.
 */
export default class Component {
  //cached AST
  protected _ast: AST|null = null;
  //prefix brand
  protected _brand: string;
  //cache of component instances
  protected _components: Component[]|undefined;
  //current working directory
  protected _cwd: string;
  //filesystem to use
  protected _fs: FSInterface;
  //the name of the component
  protected _name: string;
  //file loader helper
  protected _loader: FileLoader;
  //the seed to use for encoding the path
  protected _seed: string;
  //the source file
  protected _source: string;
  //the component type
  protected _type: 'document'|'component'|'template';

  /**
   * Returns the absolute path to the file
   */
  public get absolute() {
    return this._loader.absolute(this._source, this._cwd);
  }
  
  /**
   * Returns abstract syntax tree
   */
  public get ast() {
    if (!this._ast) {
      //parse the source code
      this._ast = Tokenizer.tokenize(this.contents);
    }

    return this._ast;
  }

  /**
   * Gets the brand prefix
   */
  public get brand() {
    return this._brand;
  }

  /**
   * Returns the class name (ie. PascalCase)
   */
  public get classname() {
    if (/^[0-9]/.test(this._name)) {
      return `N${this._name}_${this.id}`;
    }
    return `${camelize(this._name)}_${this.id}`;
  }

  /**
   * Returns the imported components
   */
  public get components() {
    if (!this._components) {
      this._components = this.ast.components.map(component => {
        //get property attributes
        const properties = component.attributes.properties;
        //find type property 
        // ie. <link type="component" />
        // ie. <link type="template" />
        const typeProperty = properties.find(
          property => property.key.name === 'type'
        );
        //determine the type of component
        const type = (
          //if property is found
          typeProperty 
          //and the value type is a literal
          && typeProperty.value.type === 'Literal'
          //and the value is 'template'
          && typeProperty.value.value === 'template'
        ) ? 'template' : 'component';

        //find name property
        // ie. <link name="foo-bar" />
        const nameProperty = properties.find(
          property => property.key.name === 'name'
        );
        //determine the type of component
        const name = (
          //if property is found
          nameProperty 
          //and the value type is a literal
          && nameProperty.value.type === 'Literal'
          //and type of value is string
          && typeof nameProperty.value.value === 'string'
        ) ? nameProperty.value.value : undefined;
          
        return new Component(component.source.value, {
          brand: this._brand,
          cwd: this._cwd,
          fs: this._fs,
          seed: this._seed,
          name: name,
          type: type
        });
      });
    }
    return this._components;
  }

  /**
   * Returns the source file contents
   */
  public get contents() {
    return this._fs.readFileSync(this.absolute, 'utf-8');
  }

  /**
   * Returns the current working directory
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * Returns a raw list of dependencies
   * this component imports
   * Used fast refresh
   */
  public get dependencies() {
    const imports = this.imports.map(token => ({
      path: this._loader.absolute(token.source, this.dirname),
      type: 'file'
    }));
    const components = this.components.map(component => ({
      path: component.absolute,
      type: component.type
    }));

    return [ ...components, ...imports ];
  }

  /**
   * Returns the dirname of the source file
   */
  public get dirname() {
    return path.dirname(this.absolute);
  }

  /**
   * Returns the filesystem being used
   */
  public get fs() {
    return this._fs;
  }

  /**
   * Returns the tml imports information
   * these imports are extracted from the <script>
   */
  public get imports() {
    return this.ast.imports.map(token => ({
      typeOnly: token.typeOnly,
      names: token.names?.map(name => name.value),
      default: token.default?.value,
      source: token.source.value
    }));
  }

  /**
   * Returns the unique id of the source file
   */
  public get id() {
    return encrypt(this.relative, this._seed);
  }

  /**
   * Returns the markup tokens
   */
  public get markup() {
    return this.ast.markup;
  }

  /**
   * Returns the path relative to cwd
   */
  public get relative() {
    const relative = path.relative(this._cwd, this.absolute);
    if (relative.startsWith('.')) {
      return relative;
    }
    return `./${relative}`;
  }
  
  /**
   * Returns the source code
   */
  public get source() {
    return this._source;
  }

  /**
   * Returns the compiled scripts
   */
  public get scripts() {
    return this.ast.scripts.map(script => script.source);
  }

  /**
   * Returns the seed used for encoding the build id
   */
  public get seed() {
    return this._seed;
  }

  /**
   * Returns the compiled styles
   */
  public get styles() {
    return this.ast.styles.map(style => style.source);
  }

  /**
   * Returns the tag name (ie. kebab-case)
   */
  public get tagname() {
    return slugify(this._name);
  }

  /**
   * Returns the component type
   */
  public get type() {
    return this._type;
  }

  /**
   * Sets the source code to compile
   */
  public constructor(source: string, options: ComponentOptions = {}) {
    //set the prefix brand
    this._brand = typeof options.brand === 'string'
      ? options.brand
      : 'temple';
    //current working directory
    this._cwd = options.cwd || process.cwd();
    //filesystem to use
    this._fs = options.fs || new FileSystem();
    //file loader helper
    this._loader = new FileLoader(this._fs);
    //the name of the component
    this._name = options.name || path.basename(source, path.extname(source));
    //the seed to use for encoding the build id
    this._seed = options.seed || 'temple';
    //ex. /path/to/component.tml
    //ex. ./path/to/component.tml
    //ex. ../path/to/component.tml
    //ex. @/path/to/component.tml
    //ex. path/to/component.tml
    this._source = source;
    //the component type
    this._type = options.type || 'component';
  }
}