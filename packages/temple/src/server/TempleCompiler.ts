//types
import type {
  StyleToken,
  MarkupToken,
  MarkupChildToken,
  CompilerOptions, 
  ComponentChunks, 
  ComponentRegistry,
  Manifest
} from './types';
//file loaders
import fs from 'fs';
import path from 'path';
import FileLoader from './FileLoader';
//parsers/compilers
import crypto from 'crypto';
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import TempleParser from './TempleParser';
import TempleDocument from './TempleDocument';
import ComponentCompiler from './ComponentCompiler';
import WebpackCompiler from './WebpackCompiler';
//helpers
import Exception from './CompilerException';

/**
 * Note: Documents cant have custom scripts because 
 * logic should be handled on the server
 */
export default class TempleCompiler {
  //the page file name
  static readonly PAGE_FILENAME = 'page.js';
  //the bundle file name
  static readonly BUNDLE_FILENAME = 'index.js';
  //the manifest file name
  static readonly MANIFEST_FILENAME = 'manifest.json';

  /**
   * Quick compile pattern
   */
  static compile(options: CompilerOptions) {
    const compiler = new TempleCompiler(options);
    return async (sourceFile: string) => {
      return await compiler.compile(sourceFile);
    }
  }

  //file system to use
  protected _fs: typeof fs;
  //current working directory
  //we need this to locate and compile imported components
  protected _cwd: string;
  //the build path
  protected _buildPath: string;
  //prefix brand
  protected _brand: string;
  //use cache files
  protected _useCache: boolean;

  /**
   * Returns the output folder
   */
  public get buildPath() {
    return this._buildPath;
  }

  /**
   * Returns the current working directory
   */
  public get cwd() {
    return this._cwd;
  }

  /**
   * Returns the current file system
   */
  public get fs() {
    return this._fs;
  }

  /**
   * Sets the source code to compile
   */
  public constructor(options: CompilerOptions) {
    //set the file system
    this._fs = options.fs || fs;
    //set the current working directory
    this._cwd = options.cwd || process.cwd();
    //set the build path
    this._buildPath = FileLoader.absolute(
      options.buildPath || '.temple', 
      this._cwd
    );
    //use cache
    this._useCache = options.useCache === false ? false : true;
    //set the prefix brand
    this._brand = options.brand || 'temple';
  }

  /**
   * Generates code
   */
  public async compile(sourceFile: string) {
    sourceFile = FileLoader.absolute(sourceFile, this._cwd);
    if (!this._fs.existsSync(sourceFile)) {
      throw Exception.for('File not found: %s', sourceFile);
    }
    //generate a build id
    const id = crypto
      .createHash('shake256', { outputLength: 10 })
      .update(path.relative(this._cwd, sourceFile))
      .digest('hex');

    const { ast, registry, definitions } = this.manifest(id, sourceFile);
    //should return registry

    const components = definitions.map(definition => registry.find(
      component => component.id === definition
    ) as ComponentChunks);

    const document = new TempleDocument();
    document.styles = this.styles(ast.styles).join("\n");
    document.scripts = await this.build(id, registry);
    document.head = this.head(ast.markup, components);
    document.body = this.body(ast.markup, components); 

    return (props: Record<string, any>) => {
      //return a string of the compiled markup
      document.props = props;
      return document.render();
    };
  }

  /**
   * Generates the body markup
   */
  protected body(markup: MarkupChildToken[], components: ComponentChunks[]) {
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

    return this.markup((body as MarkupToken).children || [], components);
  }

  /**
   * Compiles all the components and returns a webpack compiler for 
   * bundling all these into a single file
   */
  protected async build(id: string, components: ComponentChunks[]) {
    //get dynamic build folder
    const buildFolder = path.join(this._buildPath, id);
    //get the build file path
    const bundleFile = path.resolve(buildFolder, TempleCompiler.BUNDLE_FILENAME);
    //if we are using cache and the file exists, return the file
    if (this._useCache && this._fs.existsSync(bundleFile)) {
      return this._fs.readFileSync(bundleFile, 'utf8');
    }
    //setup the webpack compiler
    const webpackCompiler = new WebpackCompiler({
      fileSystem: this._fs,
      buildFolder: buildFolder,
      buildName: TempleCompiler.BUNDLE_FILENAME
    });
    //add the entry file
    webpackCompiler.entry = { 
      path: path.resolve(buildFolder, TempleCompiler.PAGE_FILENAME), 
      code: this.generate(components) 
    };
    //add the component files
    components.forEach(component => {
      webpackCompiler.addFile(
        path.resolve(
          buildFolder, 
          `components/${component.classname}.${component.id}.js`
        ),
        component.code
      );
    });
    //return the webpack compiler
    return await webpackCompiler.compile();
  }

  /**
   * Generates entry file code
   */
  protected generate(components: ComponentChunks[]) {
    //make a new project
    const project = new Project({
      skipAddingFilesFromTsConfig: true,
      compilerOptions: {
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
    const source = project.createSourceFile('page.ts');
    //import '@ossph/temple/dist/client/TempleHelpers'
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/dist/client/TempleHelpers'
    });
    components.forEach(component => {
      //import './components/Counter'
      source.addImportDeclaration({
        moduleSpecifier: `./components/${component.classname}.${component.id}`
      });
    });
    // Compile the TypeScript to JavaScript
    const result = source.getEmitOutput();
    // Concatenate all JavaScript output into a single string
    return result.getOutputFiles()
      .filter(file => file.getFilePath().endsWith('.js'))
      .map(file => file.getText())
      .join('\n')
      .replaceAll('    ', '  '); 
  }

  /**
   * Generates the head markup
   */
  protected head(markup: MarkupChildToken[], components: ComponentChunks[]) {
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

    return this.markup((head as MarkupToken).children || [], components);
  }

  /**
   * Builds the manifest
   */
  protected manifest(id: string, sourceFile: string) {
    //determine the manifest path
    //ie. [build]/1234567890/manifest.json
    const manifestPath = path.join(
      this._buildPath, 
      id, 
      TempleCompiler.MANIFEST_FILENAME
    );
    //if use cache and file exists, return the file
    if (this._useCache) {
      if (this._fs.existsSync(manifestPath)) {
        return JSON.parse(this._fs.readFileSync(manifestPath, 'utf-8')) as Manifest;
      }
    }
    //load the source code
    const sourceCode = this._fs.readFileSync(sourceFile, 'utf-8');
    //parse source code to AST
    const ast = TempleParser.parse(sourceCode);
    //Use ComponentRegistry to prevent recompiling 
    //the same components over and over again...
    const registry: ComponentRegistry = {};
    //create a new component compiler
    const componentCompiler = new ComponentCompiler({
      fs: this._fs,
      cwd: this._cwd,
      brand: this._brand
    }, registry);
    //compile all components
    const components = ast.components.map(token => {
      //find the absolute file path relative to this file
      const inputSourceFile = FileLoader.route(
        sourceFile,
        token.source.value
      );

      // This will also be used as the key name because it's the best 
      // way to make sure the component is unique because it's possible 
      // for components to have the same name it's also possible for 
      // components to have the tag name (although rare)

      //create a component compiler
      registry[inputSourceFile] = componentCompiler.compile(
        inputSourceFile,
        true
      );
      return registry[inputSourceFile];
    });

    const manifest = { 
      ast, 
      definitions: components.map(component => component.id), 
      registry: Object.values(registry)
    };

    //if use cache
    //if (this._useCache) {
      //if the directory does not exist, create it
      if (!this._fs.existsSync(path.dirname(manifestPath))) {
        this._fs.mkdirSync(
          path.dirname(manifestPath), 
          { recursive: true }
        );
      }
      //write the manifest file
      this._fs.writeFileSync(
        manifestPath, 
        JSON.stringify(manifest, null, 2)
      );
    //}

    return manifest;
  }

  /**
   * Compiles the markup
   */
  protected markup(markup: MarkupChildToken[], components: ComponentChunks[]) {
    return markup.map(child => {
      let expression = '';
      if (child.type === 'MarkupExpression') {
        const tagName = this.tagName(child, components); 
        expression += `<${tagName}`;
        if (child.attributes && child.attributes.properties.length > 0) {
          expression += ' ' + child.attributes.properties.map(property => {
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
            }

            return false;
          }).filter(Boolean).join(' ');
        }
        if (child.kind === 'inline' && !this.isComponent(child, components)) {
          expression += ' />';
        } else {
          expression += '>';
          if (child.children) {
            expression += this.markup(child.children, components);
          }
          expression += `</${tagName}>`;
        }
      } else if (child.type === 'Literal') {
        expression += child.value;
      } else if (child.type === 'ProgramExpression') {
        expression += `\${${child.source}}`;
      }
      return expression;
    }).join('');
  }

  /**
   * Compiles the styles
   */
  protected styles(styles: StyleToken[]) {
    return styles.map(style => style.source);
  }

  /**
   * Determines if the child is a component
   */
  private isComponent(child: MarkupToken, components: ComponentChunks[]) {
    return components.find(
      component => component.tagname === child.name
    );
  }

  /**
   * Returns the tag name
   */
  private tagName(child: MarkupToken, components: ComponentChunks[]) {
    return this.isComponent(child, components) 
      ? `${this._brand}-${child.name}`
      : child.name;
  }
}