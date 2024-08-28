import type { PluginBuild } from 'esbuild';
import type { Dependants } from './types';

import path from 'path';
import ts from 'typescript';
import { Project, IndentationText } from 'ts-morph';
import { 
  Component, 
  ComponentTranspiler,
  DocumentBuilder, 
  esAliasPlugin,
  esComponentPlugin,
  esWorkspacePlugin,
  toTS
} from '@ossph/temple/compiler';

export function createSourceFile(filePath: string) {
  const project = new Project({
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
  });
  const source = project.createSourceFile(filePath);
  return { project, source };
};

export function dependantsOf(
  filePath: string, 
  component: Component, 
  dependants: Dependants = {}
) {
  const imported = component.dependencies.find(dependency => {
    const extname = path.extname(dependency.path);
    const end = dependency.path.length - extname.length;
    const basename = dependency.path.substring(0, end);
    return dependency.path === filePath || basename === filePath;
  });
  if (imported) {
    dependants[component.absolute] = { component, type: imported.type };
  }
  component.components.forEach(component => {
    dependantsOf(filePath, component, dependants);
  });
  return Object.values(dependants);
}

export function esRefreshPlugin(component: Component) {
  const name = 'temple-refresh-plugin';
  return {
    name: name,
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /^__REFRESH__$/ }, args => {
        return { path: args.path, namespace: name };
      });

      build.onLoad({ filter: /^__REFRESH__$/, namespace: name }, args => {
        const source = transpile(component);
        return {
          contents: toTS(source),
          loader: 'ts'
        };
      });
    }
  };
};

export function transpile(component: Component) {
  const { 
    absolute,
    classname,
    imports,
    styles, 
    scripts
  } = component;
  const transpiler = new ComponentTranspiler(component);
  //get path without extension
  //ex. /path/to/Counter.tml -> /path/to/Counter
  const extname = path.extname(absolute);
  const filePath = absolute.slice(0, -extname.length);
  //create a new source file
  const { source } = createSourceFile(`${filePath}.ts`);
  //import { TempleRegistry, TempleComponent } from '@ossph/temple/client';
  source.addImportDeclaration({
    moduleSpecifier: '@ossph/temple/client',
    namedImports: [ 
      'emitter',
      'data as __APP_DATA__',
      'TempleRegistry', 
      'TempleComponent' 
    ]
  });
  //import Counter from './Counter'
  component.components.filter(
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

  //function styles()
  source.addFunction({
    name: 'styles',
    statements: `return \`${styles.join('\n').trim()}\`;`
  });

  //function template()
  source.addFunction({
    name: 'template',
    statements: `${scripts.length > 0 
      ? scripts.join('\n')
      //allow scriptless components to use props
      : (`
        const props = this.props; 
        const children = () => this.originalChildren;
      `)}
      return () => ${transpiler.markup.trim()};`
  });

  //main script
  source.addStatements(`
    const Component = TempleBundle.components['${classname}'];
    if (Component) {
      Component.prototype.styles = styles;
      Component.prototype.template = template;
      
      //get elements and components from registry
      const components = Array.from(TempleBundle.TempleRegistry.elements.keys());
      //for each component
      components.forEach(component => {
        //if the component is an instance of Counter
        if (component instanceof Component) {
          //replace styles() and template()
          component.styles = styles;  
          component.template = template;
          component._template = null;
          component._initiated = false;
          component.update = function() {
            //set the current component
            __APP_DATA__.set('current', this);
            //get the styles
            const styles = this.styles();
            //get the template
            this._template = this.template();
            //emit the unmounted event
            emitter.emit('unmounted', this);
            //get the children build w/o re-initializing the variables
            const children = this._template().filter(Boolean) as Element[];
            //if no styles, just set the innerHTML
            if (styles.length === 0) {
              //empty the current text content
              this.textContent = '';
              //now append the children
              children.forEach(child => this.appendChild(child));
            //there are styles, use shadow dom
            } else {
              //if shadow root is not set, create it
              if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
              }

              const shadowRoot = this.shadowRoot as ShadowRoot;
              //empty the current text content
              //the old data is captured in props
              this.textContent = '';
              shadowRoot.textContent = '';
              //append the styles
              const style = document.createElement('style');
              style.innerText = styles;
              shadowRoot.appendChild(style);
              //now append the children
              children.forEach(child => this.shadowRoot?.appendChild(child));
            }
            //reset the current component
            __APP_DATA__.delete('current');
            this._initiated = true;
            //emit the mounted event
            emitter.emit('mounted', this);
            return this.shadowRoot ? this.shadowRoot.innerHTML :this.innerHTML;
          };
          //then re-render
          component.update();
        }
      });
    }
  `);

  return source;
};

export async function update(component: Component) {
  return await DocumentBuilder.build('__REFRESH__', {
    minify: false,
    plugins: [ 
      esAliasPlugin({
        cwd: component.cwd,
        fs: component.fs
      }),
      esRefreshPlugin(component),
      esComponentPlugin({
        cwd: component.cwd,
        fs: component.fs
      }),
      esWorkspacePlugin()
    ]
  });
}