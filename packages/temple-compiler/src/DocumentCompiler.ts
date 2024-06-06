import type { ComponentToken, MarkupToken } from '@ossph/temple-parser';
import type { Compiler, CompilerOptions } from './types';

import path from 'path';
import { DataParser } from '@ossph/temple-parser';
import ComponentCompiler from './ComponentCompiler';
import { serialize } from './helpers';

export default class DocumentCompiler extends ComponentCompiler {
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
    //set the type
    this._type = options.type || 'document';
    //by default, we dont register the custom elements
    this._register = options.register === true;
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
   * Generates the markup for a standard element
   */
  protected _markupElement(
    expression: string, 
    parent: MarkupToken|null,
    token: MarkupToken,
    components: Compiler[]
  ) {
    //if we are suppose to register this to customElements
    //it means we want to treat this as any other web component
    if (this._register) {
      return super._markupElement(expression, parent, token, components);
    }
    //check to see if the token refers to a 
    //component directly imported by this file
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
      expression += `TempleDocument.createComponent('${token.name}', {`;
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
        expression += this._markup(token, token.children, components);
      }
      expression += `)`;
    }
    
    return expression;
  }
}