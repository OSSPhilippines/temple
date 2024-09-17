import type { TempleComponentClass, RegistryIterator } from '../types';
import TempleComponent from './TempleComponent';

import TempleElement from './TempleElement';

//this is used to convert HTML entities to their respective characters
const decoder = document.createElement('textarea');
const decode = (value: string) => {
  decoder.innerHTML = value;
  return decoder.value;
}

/**
 * A registry of all TempleElement/TempleComponent instances 
 * to add better attribute handling
 */
export default class TempleRegistry {
  //A registry of all TempleElement instances
  protected static _elements = new Map<Element, TempleElement>();

  /**
   * Returns the registry
   */
  public static get elements() {
    return this._elements;
  }

  /**
   * Localizes a TempleComponent instance
   */
  public static createComponent(
    tagname: string,
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
    //@ts-ignore set the observed attributes
    if (definition.observedAttributes) {
      //@ts-ignore set the observed attributes
      component.constructor.observedAttributes = definition.observedAttributes;
    }
    //not call the magic constructor
    component.register(attributes, children);
    //return the element
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
      } else if (value === true) {
        element.setAttribute(key, key);
      }
    }
    //append children (the original children)
    children
      .filter(child => typeof child !== 'undefined')
      .forEach(child => element.appendChild(child));
    //last manually register the element
    return this.register(element, attributes);
  }

  /**
   * Creates a TextNode and returns it
   */
  public static createText(value: string, escape = true) {
    //NOTE: TextNode will escape strings by default
    // if we allow escape to be false, and the string 
    // contains HTML, then the TempleRegistry count
    // will be off.. there are also some other edge 
    // cases that need to be considered before allowing
    // escape to be false...
    return document.createTextNode(decode(value));
  }

  /**
   * Like array filter for registry
   */
  public static filter(callback: RegistryIterator<boolean>) {
    const elements: TempleElement[] = [];
    this._elements.forEach((temple, html) => {
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
    return this._elements.get(element) || null;
  }

  /**
   * Returns whether the element is registered
   */
  public static has(element: Element) {
    return this._elements.has(element);
  }

  /**
   * Like array map for registry
   */
  public static map<T = any>(callback: RegistryIterator<T>) {
    const elements: T[] = [];
    this._elements.forEach((temple, html) => {
      elements.push(callback(temple, html));
    });
    return elements;
  }

  /**
   * Registers a new TempleElement instance
   */
  public static register(element: Element, attributes?: Record<string, any>) {
    if (this.has(element)) {
      return this.get(element) as TempleElement;
    }
    const node = new TempleElement(element, attributes || {});
    this._elements.set(element, node);
    return node;
  }
}