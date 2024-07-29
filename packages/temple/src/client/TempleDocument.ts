import type { TempleComponentClass, RegistryIterator } from './types';
import type TempleComponent from './TempleComponent';

import TempleElement from './TempleElement';

/**
 * A registry of all TempleElement/TempleComponent instances 
 * to add better attribute handling
 */
export default class TempleDocument {
  //prefix brand
  protected static _brand = 'temple';
  //A registry of all TempleElement instances
  protected static _registry = new Map<Element, TempleElement>();

  /**
   * Returns the registry
   */
  public static get registry() {
    return this._registry;
  }

  /**
   * Sets the brand prefix
   */
  public static set brand(value: string) {
    this._brand = value;
  }

  /**
   * Localizes a TempleComponent instance
   */
  public static createComponent(
    definition: TempleComponentClass, 
    attributes: Record<string, any>, 
    children: Element[] = []
  ) {
    //We cant just instantiate the component and return it because
    //an error `Illegal constructor` will be thrown if the component 
    //is not registered via customElements.define(). A work around is
    //to create a fragment via template then copy the TempleComponent
    //definitions to that. This will allow us to encapsule a component
    //inside of another component without having to register it.

    //get the tagname for the component
    const tagname = this._brand.length > 0 
      ? `${this._brand}-${definition.component[0]}`
      : definition.component[0];
    // Create a template for the inner component
    const template = document.createElement('template');
    template.innerHTML = `<${tagname}></${tagname}>`;
    // Create a document fragment and append the inner component instance
    const fragment = template.content;
    //get the shallow component shell
    const component = fragment.querySelector(`${tagname}`) as TempleComponent;
    //copy the prototype
    Object.setPrototypeOf(component, definition.prototype);
    //set the constructor
    component.constructor = definition.constructor;
    //@ts-ignore set the component names
    component.constructor.component = definition.component;
    //set attributes
    for (const [ key, value ] of Object.entries(attributes)) {
      if (typeof value === 'string') {
        component.setAttribute(key, value);
      }
    }
    //append children
    children.forEach(child => component.appendChild(child));
    //normally an instantiated component would self register,
    //but since we manually instantiated it to produce web component
    //encapsulation, we need to manually register this component as well
    component.init(attributes);
    //wait for the component to be ready, 
    //then set props, children and render
    component.wait();
    return component.element;
  }

  /**
   * Creates a new TempleElement instance
   */
  public static createElement(
    name: string, 
    attributes: Record<string, any>, 
    children: Element[] = []
  ) {
    //create html element
    const element = document.createElement(name);
    //set attributes
    for (const [ key, value ] of Object.entries(attributes)) {
      if (typeof value === 'string') {
        element.setAttribute(key, value);
      }
    }
    //append children
    children.forEach(child => element.appendChild(child));
    //we need to manually register the element
    return this.register(element, attributes);
  }

  /**
   * Creates a TextNode and returns it
   */
  public static createText(value: string) {
    return document.createTextNode(value);
  }

  /**
   * Like array filter for registry
   */
  public static filter(callback: RegistryIterator<boolean>) {
    const elements: TempleElement[] = [];
    this._registry.forEach((temple, html) => {
      if (callback(temple, html)) {
        elements.push(temple);
      }
    });
    return elements;
  }

  /**
   * Returns the TempleElement instance for the given element
   */
  public static get(element: Element) {
    return this._registry.get(element) || null;
  }

  /**
   * Like array map for registry
   */
  public static map<T = any>(callback: RegistryIterator<T>) {
    const elements: T[] = [];
    this._registry.forEach((temple, html) => {
      elements.push(callback(temple, html));
    });
    return elements;
  }

  /**
   * Registers a new TempleElement instance
   */
  public static register(element: Element, attributes?: Record<string, any>) {
    if (this._registry.has(element)) {
      return this.get(element);
    }
    const node = new TempleElement(element, attributes || {});
    this._registry.set(element, node);
    return node;
  }
}