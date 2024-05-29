import type { TempleComponentClass, RegistryIterator } from './types';
import type TempleComponent from './TempleComponent';
import TempleEmitter from './TempleEmitter';

/**
 * A registry of all TempleDocument instances 
 * to add better attribute handling
 */
export default class TempleDocument {
  //prefix brand
  protected static _brand = 'temple';
  //A registry of all TempleDocument instances
  protected static _registry = new Map<Element, TempleDocument>();

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
   * Creates a new TempleDocument instance
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
    const elements: TempleDocument[] = [];
    this._registry.forEach((temple, html) => {
      if (callback(temple, html)) {
        elements.push(temple);
      }
    });
    return elements;
  }

  /**
   * Returns the TempleDocument instance for the given element
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
   * Registers a new TempleDocument instance
   */
  public static register(element: Element, attributes?: Record<string, any>) {
    if (this._registry.has(element)) {
      return this.get(element) as TempleDocument;
    }
    return new TempleDocument(element, attributes || {});
  }

  //the html element
  protected _element: Element;
  //the html element attributes (with any value)
  protected _attributes: Record<string, any>;

  /**
   * Returns the attributes of the element
   */
  public get attributes() {
    return Object.assign({}, this._attributes);
  }

  /**
   * Returns the element
   */
  public get element() {
    return this._element;
  }

  /**
   * Creates the HTML element and adds it to the registry 
   */
  public constructor(element: Element, attributes: Record<string, any>) {
    this._element = element;
    this._attributes = attributes;
    //add to registry
    TempleDocument._registry.set(this._element, this);
  }

  /**
   * Returns true if the attribute exists
   */
  public hasAttribute(key: string) {
    return key in this._attributes;
  }

  /**
   * Returns the attribute value
   */
  public getAttribute<T = any>(key: string) {
    return this._attributes[key] as T;
  }

  /**
   * Removes the attribute
   */
  public removeAttribute(key: string, silent = false) {
    //get the current value
    const current = this.getAttribute(key);
    //if the value is undefined
    if (typeof current === 'undefined') {
      //no need to remove it
      return this;
    }
    delete this._attributes[key];
    this._element.removeAttribute(key);
    if (!silent) {
      //emit the change event
      TempleEmitter.emit('attribute-remove', this, key, current);
    }
    return this;
  }

  /**
   * Sets the attribute value
   */
  public setAttribute(key: string, value: any, silent = false) {
    if (typeof value === 'undefined') {
      return this.removeAttribute(key, silent);
    }
    //get the current value
    const current = this.getAttribute(key);
    //if the value is the same
    if (current === value) {
      //no need to set it
      return this;
    }
    //set the new value
    this._attributes[key] = value;
    if (typeof value === 'string') {
      this._element.setAttribute(key, value);
    }
    if (!silent) {
      //emit the change event
      if (typeof current === 'undefined') {
        TempleEmitter.emit('attribute-create', this, key, value);
      } else {
        TempleEmitter.emit('attribute-update', this, key, value, current);
      }
    }
    
    return this;
  }

  /**
   * Sets the attributes
   */
  public setAttributes(attributes: Record<string, any>, silent = false) {
    //loop through all the attributes
    for (const [ key, value ] of Object.entries(attributes)) {
      //and just set it
      this.setAttribute(key, value, silent);
    }
    //get all the names so we know which ones to remove
    const names = Object.keys(attributes);
    //loop through all the element attributes
    for (const key of Object.keys(this._attributes)) {
      //if the key is not in the names, remove it
      if (!names.includes(key)) {
        this.removeAttribute(key, silent);
      }
    }

    return this;
  }
}