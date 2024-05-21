//types
import type { 
  ComponentToken,
  IdentifierToken,
  ImportToken, 
  MarkupToken,
  MarkupChildToken, 
  PropertyToken, 
  ScriptToken,
  StyleToken,
  CompilerOptions, 
  TemplateChunks, 
  ComponentRegistry,
  ComponentChunks
} from './types';
//file systems
import fs from 'fs';
import path from 'path';
import FileLoader from './FileLoader';
//parsers/compilers
import crypto from 'crypto';
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import DataParser from './DataParser';
import TempleParser from './TempleParser';
//helpers
import { camelize, slugify } from './helpers';
import Exception from './CompilerException';

export default class ComponentCompiler {
  //file system to use
  protected _fs: typeof fs;
  //current working directory
  //we need this to locate and compile imported components
  protected _cwd: string;
  //prefix brand
  protected _brand: string;
  //the compiled components cache
  protected _compiledComponents: ComponentRegistry;

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
  public constructor(options: CompilerOptions, cache: ComponentRegistry) {
    //set the file system
    this._fs = options.fs || fs;
    //set the current working directory
    this._cwd = options.cwd || process.cwd();
    //set the prefix brand
    this._brand = options.brand || 'temple';
    //set the compiled components cache
    this._compiledComponents = cache;
  }

  /**
   * Generates code
   */
  public compile(sourceFile: string, register = false) {
    sourceFile = FileLoader.absolute(sourceFile, this._cwd);
    if (!this._fs.existsSync(sourceFile)) {
      throw Exception.for('File not found: %s', sourceFile);
    }
    //determine class name
    const basename = path.basename(sourceFile, path.extname(sourceFile));
    //determine slug
    const tagname = slugify(basename);
    //determine camel (capitalized)
    const classname = camelize(basename);
    
    //load the source code
    const sourceCode = this._fs.readFileSync(sourceFile, 'utf-8');
    //parse the source code
    const ast = TempleParser.parse(sourceCode);
    const components = this.components(sourceFile, ast.components);
    const imports = this.imports(ast.imports);
    const scripts = this.scripts(ast.scripts);
    const styles = this.styles(ast.styles);
    const markup = this.markup(ast.markup, components);

    //generate a build id
    const id = crypto
      .createHash('shake256', { outputLength: 10 })
      .update(path.relative(this._cwd, sourceFile))
      .digest('hex');

    //generate the code
    const code = this.generate({
      tagname,
      classname,
      components,
      imports,
      scripts,
      styles,
      markup
    }, register);

    return {
      id,
      tagname,
      classname,
      code
    };
  }

  /**
   * Returns the compiled components
   */
  protected components(sourceFile: string, components: ComponentToken[]) {
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
      if (!this._compiledComponents[inputSourceFile]) {
        //compile it
        this._compiledComponents[inputSourceFile] = this.compile(inputSourceFile);
      }
      //return the compiled component
      return this._compiledComponents[inputSourceFile] ;
    });
  }

  /**
   * Generates code
   */
  protected generate(chunks: TemplateChunks, register = false) {
    const { 
      tagname, 
      classname,
      components, 
      imports, 
      scripts, 
      styles, 
      markup 
    } = chunks;
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
    const source = project.createSourceFile(`${classname}.ts`);
    //import TempleElement from '@ossph/temple/dist/client/TempleElement'
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/dist/client/TempleElement',
      defaultImport: 'TempleElement'
    });
    //import TempleComponent from '@ossph/temple/dist/client/TempleComponent'
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/dist/client/TempleComponent',
      defaultImport: 'TempleComponent'
    });
    components.forEach(component => {
      //import Counder from './components/Counter.abc123'
      source.addImportDeclaration({
        moduleSpecifier: `./${component.classname}.${component.id}`,
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
    //export default class FoobarComponent extends TempleComponent
    const component = source.addClass({
      name: classname,
      extends: 'TempleComponent',
      isDefaultExport: true,
    });
    //public static component = ['foo-bar', 'FoobarComponent'];
    component.addProperty({
      name: 'component',
      isStatic: true,
      initializer: `[ '${tagname}', '${classname}' ]`
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
      statements: `${scripts.join('\n')}\nreturn () => ${markup.trim()};`
    });

    if (register) {
      //customElements.define('foo-bar', 'FoobarComponent');
      source.addStatements(
        `customElements.define('${this._brand}-${tagname}', ${classname});`
      );
    }

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
   * Returns the compiled imports
   */
  protected imports(imports: ImportToken[]) {
    return imports.map(token => ({
      typeOnly: token.typeOnly,
      names: token.names?.map(name => name.value),
      default: token.default?.value,
      source: token.source.value
    }));
  }

  /**
   * Compiles the markup
   */
  protected markup(markup: MarkupChildToken[], components: ComponentChunks[]) {
    return "[\n" + markup.map(child => {
      let expression = '';
      if (child.type === 'MarkupExpression') {
        if (child.name === 'if') {
          //syntax <if true={count > 1}>...</if>
          return this.markupConditional(child, components);
        } else if (child.name === 'each') {
          //syntax <each value=item key=i from=list>...</each>
          return this.markupIterator(child, components);
        }
        //syntax <div title="Some Title">...</div>
        expression += this.markupElement(expression, child, components);
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
   * Returns the compiled scripts
   */
  protected scripts(scripts: ScriptToken[]) {
    return scripts.map(script => script.source);
  }

  /**
   * Returns the compiled styles
   */
  protected styles(styles: StyleToken[]) {
    return styles.map(style => style.source);
  }

  /**
   * Generated the markup for a conditional statement
   */
  private markupConditional(token: MarkupToken, components: ComponentChunks[]) {
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
      expression += this.markup(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ' : [])';
    return expression;
  }

  /**
   * Generates the markup for a standard element
   */
  private markupElement(
    expression: string, 
    token: MarkupToken,
    components: ComponentChunks[]
  ) {
    //check to see if the token refers to a component imported by this file
    const instance = components.find(
      component => component.tagname === token.name
    );
    //if the token refers to a component imported by this file
    if (instance) {
      expression += `TempleElement.localize(${instance.classname}, {`;
    } else {
      const tagName = this.tagName(token); 
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
        expression += this.markup(token.children, components);
      }
      expression += `).element`;
    }
    
    return expression;
  }

  /**
   * Generates the markup for an iterator (each)
   */
  private markupIterator(token: MarkupToken, components: ComponentChunks[]) {
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
      expression += this.markup(token.children, components);
    } else {
      expression += '[]';
    }
    expression += ').flat()';
    return expression;
  }

  /**
   * Determines the tag name
   */
  private tagName(token: MarkupToken) {
    const isComponent = Object
      .keys(this._compiledComponents)
      .find(tagName => tagName === token.name);

    return isComponent? `${this._brand}-${token.name}`: token.name; 
  }
}