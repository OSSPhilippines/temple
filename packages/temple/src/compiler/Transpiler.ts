//types
import type { ProjectOptions } from 'ts-morph';
import type { MarkupToken, MarkupChildToken } from '../types';
import type DirectiveInterface from '../directives/DirectiveInterface';
import type Component from './Component';
//file systems
import path from 'path';
//parsers
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import Parser from './Parser';
//directives
import { 
  IfDirective,
  ElifDirective,
  ElseDirective
} from '../directives/ConditionalDirective';
import { 
  TryDirective,
  CatchDirective
} from '../directives/TryCatchDirective';
import IteratorDirective from '../directives/IteratorDirective';

/**
 * Converts a parsed component to a transpiled JS/TS source code
 */
export default class Transpiler {
  //compiler
  protected _component: Component;
  //ts-morph project options
  protected _config: ProjectOptions;
  //directive registry
  protected _directives = new Map<string, DirectiveInterface>();

  /**
   * Returns the component
   */
  public get component() {
    return this._component;
  }

  /**
   * Returns the compiled body script to put in template() 
   */
  public get markup() {
    return this._markup(
      null, 
      this._component.ast.markup, 
      this._component.components
    );
  }

  /**
   * Sets the compiler and generator options
   */
  constructor(component: Component, tsconfig?: string) {
    //compiler
    this._component = component;
    this._config = {
      tsConfigFilePath: tsconfig,
      skipAddingFilesFromTsConfig: true,
      compilerOptions: {
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
    };
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
   * Generates component code to be used on the browser
   */
  public transpile() {
    const { 
      absolute,
      classname, 
      imports,
      styles, 
      scripts,
      tagname
    } = this._component;
    //get path without extension
    //ex. /path/to/Counter.tml -> /path/to/Counter
    const extname = path.extname(absolute);
    const filePath = absolute.slice(0, -extname.length);
    //create a new source file
    const { source } = this._createSourceFile(`${filePath}.ts`);
    //import { TempleRegistry, TempleComponent } from '@ossph/temple/client';
    source.addImportDeclaration({
      moduleSpecifier: '@ossph/temple/client',
      namedImports: [ 'TempleRegistry', 'TempleComponent' ]
    });
    //import Counter from './Counter'
    this._component.components.filter(
      component => component.type === 'component'
    ).forEach(component => {
      //now import
      source.addImportDeclaration({
        moduleSpecifier: component.source,
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
      initializer: `[ '${tagname}', '${classname}' ] as [ string, string ]`
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
      statements: `${scripts.length > 0 
        ? scripts.join('\n')
        //allow scriptless components to use props
        : (`
          const props = this.props; 
          const children = () => this.originalChildren;
        `)}
        return () => ${this.markup.trim()};`
    });

    return source;
  }

  /**
   * API to create a ts-morph source file
   */
  protected _createSourceFile(filePath: string) {
    const project = new Project(this._config);
    const source = project.createSourceFile(filePath);
    return { project, source };
  }

  /**
   * Transforms markup to JS for the template() function
   */
  protected _markup(
    parent: MarkupToken|null,
    markup: MarkupChildToken[], 
    components: Component[]
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
          if (child.escape) {
            expression += `TempleRegistry.createText(\`${child.value}\`, true)`;
          } else {
            expression += `TempleRegistry.createText(\`${child.value}\`, false)`;
          }
          
        //null, true, false, number 
        } else {
          expression += `TempleRegistry.createText(String(${child.value}))`;
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
    components: Component[]
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
      const componentName = component.classname;
      expression += `TempleRegistry.createComponent(${componentName}, {`;
    //this is a tag that is not a component/template
    } else {
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