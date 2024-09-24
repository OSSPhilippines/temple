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
    const { registered } = definition;
    //if the component being created is not a
    //registered component in customElements
    if (!registered) {
      //we need to pseudo create the component instead.
      return this.createVirtualComponent(
        tagname, 
        definition, 
        attributes, 
        children
      );
    }
    
    //NOTE: It's more logical to call this.crateElement()
    //but TempleComponent will error because it's not
    //registered in TempleRegistry yet. 
    
    //change the tagname if the component is registered
    //this is to avoid confusion with different tag names 
    //using the same component.
    const component = document.createElement(registered);
    //uhh, wait for this to be registered in customElements?
    customElements.upgrade(component);
    //a registered component will self register itself in the constructor
    //but we need to update the attributes and children
    //try to register it
    const element = TempleRegistry.register(component, attributes);
    //set the attributes again to include non-string values
    element.setAttributes(attributes, true);
    //set attributes natively so it shows 
    //up in the markup when it's rendered
    //NOTE: We cannot assume this is a TempleComponent...
    for (const [ name, value ] of Object.entries(attributes)) {
      if (typeof value === 'string') {
        component.setAttribute(name, value);
      } else if (value === true) {
        component.setAttribute(name, '');
      }
    }
    //append children (the original children)
    children
      .filter(child => typeof child !== 'undefined')
      .forEach(child => component.appendChild(child));
    //return the element
    return element;
  }

  /**
   * Creates a new TempleElement instance
   */
  public static createElement(
    name: string, 
    attributes: Record<string, any>, 
    children: Node[] = []
  ) {
    //create html element
    const element = document.createElement(name);
    //set attributes
    for (const [ name, value ] of Object.entries(attributes)) {
      if (typeof value === 'string') {
        element.setAttribute(name, value);
      } else if (value === true) {
        element.setAttribute(name, '');
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
   * Localizes a TempleComponent instance
   */
  public static createVirtualComponent(
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
    const component = document.createElement(tagname) as TempleComponent;
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
    //now call the magic constructor
    component.register(attributes, children);
    //return the element
    return component.element;
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