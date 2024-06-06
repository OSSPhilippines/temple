import TempleEmitter from './TempleEmitter';

/**
 * A registry of all TempleDocument instances 
 * to add better attribute handling
 */
export default class TempleElement {
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
   * Creates the HTML element
   */
  public constructor(element: Element, attributes: Record<string, any>) {
    this._element = element;
    this._attributes = attributes;
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
      TempleEmitter.emit('attribute-remove', {
        element: this, 
        key: key, 
        previous: current
      });
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
        TempleEmitter.emit('attribute-create', { element: this, key, value });
      } else {
        TempleEmitter.emit('attribute-update', {
          element: this, 
          key: key, 
          value: value,
          previous: current
        });
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