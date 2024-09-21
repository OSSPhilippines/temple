import TempleEmitter from './TempleEmitter';

/**
 * Wraps an HTML element adding advanced attribute value handling
 */
export default class TempleElement {
  //the html element
  protected _element: Element;
  //the html element attributes (with any value)
  protected _attributes: Record<string, any>;
  //map of events listening to
  protected _events = new Set<string>();

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
   * Returns the listeners
   */
  public get events() {
    return this._events;
  }

  /**
   * Creates the HTML element
   */
  public constructor(element: Element, attributes: Record<string, any>) {
    this._element = element;
    this._attributes = attributes;
  }

  /**
   * Adds an event this is listening to
   */
  public addEvent(event: string) {
    this._events.add(event);
    return this;
  }

  /**
   * Returns the props except the dash 
   * keys are transformed to camel case
   */
  public camel() {
    return Object.fromEntries(
      Object.entries(this._attributes).map(([ key, value ]) => {
        if (key === 'class') {
          return [ 'className', value ];
        }
        const camel = key.replace(
          /-([a-z])/g, 
          (_, letter) => letter.toUpperCase()
        ).replaceAll('-', '');
        return [ camel, value ];
      })
    );
  }

  /**
   * Returns the attribute value
   */
  public getAttribute<T = any>(key: string) {
    return this._attributes[key] as T;
  }

  /**
   * Returns true if the attribute exists
   */
  public hasAttribute(key: string) {
    return key in this._attributes;
  }

  /**
   * Returns true if the listener exists
   */
  public hasEvent(event: string) {
    return this._events.has(event);
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

  /**
   * Returns the attributes where the key with 
   * dashes are transformed into sub objects.
   * ex. data-foo-bar => { data: { foo: { bar: value } } }
   * this function will recursively call itself to
   * handle nested objects.
   */
  public tree(attributes?: Record<string, any>, name?: string, value?: any) {
    //if the attributes are not defined
    if (!attributes) {
      //then make a copy of the attributes by default
      attributes = { ...this._attributes };
    }
    //if the name is defined then the logic mode 
    //changes to building the branches of the tree
    if (name) {
      //make a key path
      const path = name.split('-');
      if (path.length > 0) {
        //get the first key
        const key = path.shift() as string;
        //if there are still paths...
        if (path.length > 0) {
          //make sure the key exists in the attributes
          if (!attributes[key]) attributes[key] = {};
          //keep going until there are no more paths
          this.tree(attributes[key], path.join('-'), value);
        //there are no more paths
        } else {
          //finally set the value
          attributes[key] = value;
        }
      }
      //at any rate, return the attributes
      //to exit this branching mode
      return attributes;
    }
    //This is the main mode of the function.
    //create a new branch
    const branch: Record<string, any> = {};
    //loop through all the attributes
    for (const [ name, value ] of Object.entries(attributes)) {
      //add the attribute to the object
      this.tree(branch, name, value);
    }
    //return the object
    return branch;
  }
}