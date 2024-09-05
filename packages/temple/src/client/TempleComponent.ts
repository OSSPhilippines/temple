import type { Hash } from '../types';

import TempleRegistry from './TempleRegistry';
import emitter from './TempleEmitter';
import __APP_DATA__ from './data';

/**
 * Temple web component class
 */
export default abstract class TempleComponent extends HTMLElement {
  //name of the component [ tag-name, className ]
  public static component: [ string, string ];

  /**
   * Self registers the component
   */
  public static register() {
    customElements.define(
      this.component[0], 
      this as unknown as CustomElementConstructor
    );
  }

  //whether the component has initiated
  //this is a flag used by signals to check
  //the number of signals that exists
  //in this component
  protected _initiated = false;
  //the callback to render just the children 
  //(wo initializing the variables again)
  protected _template: (() => (Element|false)[])|null = null;
  //the initial attributes (string and true values)
  protected _attributes: Record<string, string|true> = {};
  //the initial props (all values)
  protected _props: Hash = {};
  //the initial children
  protected _children: ChildNode[]|undefined = undefined;
  //prevents rendering loops
  protected _rendering = false;

  /**
   * Returns the component styles
   */
  public abstract styles(): string;

  /**
   * Returns the component template
   */
  public abstract template(): () => (Element|false)[];

  /**
   * Returns the component attributes
   */
  public get attr() {
    return this._attributes;
  }

  /**
   * Returns the component's element registry
   */
  public get element() {
    if (!TempleRegistry.has(this)) {
      //@ts-ignore - This constructor is called when the component is 
      //registered via customElements.define() and technically a new 
      //instance from the virtual instantiation made in 
      //TempleRegistry.createComponent(). We need a way map this component 
      //with the virtually created in TempleRegistry.createComponent().
      return TempleRegistry.register(this, this._TempleAttributes || {});
    }
    return TempleRegistry.get(this);
  }

  /**
   * Returns the component's metadata
   */
  public get metadata() {
    const [ tagname, classname ] = (
      this.constructor as typeof TempleComponent
    ).component;
    return { tagname, classname };
  }

  /**
   * Returns the original component's children
   * before the component was initiated
   */
  public get originalChildren() {
    return this._children;
  }

  /**
   * Returns whether the component has initiated
   */
  public get initiated() {
    return this._initiated;
  }

  /**
   * Returns the component properties
   */
  public get props() {
    return this._props;
  }

  /**
   * Sets the component properties
   */
  public set props(props: Hash) {
    //shallow copy the props
    this._props = Object.assign({}, props);
    //only set the attributes that are strings or true
    this._attributes = Object.fromEntries(
      Object.entries(props).filter(
        entry => typeof entry[1] === 'string' || entry[1] === true
      )
    );
  }

  /**
   * Called when component moved to a new document
   */
  public adoptedCallback() {
    this.render();
  }

  /**
   * Called when an attribute is added, removed, updated, or replaced
   * but you need to set observedAttributes first.
   * ie. static observedAttributes = ["color", "size"]; 
   */
  public attributeChangedCallback(
    name: string, 
    previous: string, 
    value: string
  ) {
    this.props = { ...this.props, [name]: value };
    this.render();
  }

  /**
   * Called when the element is inserted into a document,
   */
  public connectedCallback() {
    //attributes are ready here
    this.wait();
  }

  /**
   * Called when the element is removed from a document
   */
  public disconnectedCallback() {
    //remove listeners here
  }

  /**
   * Returns the parent component (if any)
   */
  public getParentComponent() {
    let parent = this.parentElement;
    while (parent) {
      if (parent instanceof TempleComponent) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  /**
   * Registers this component to the global registry and caches the element
   */
  public register() {
    TempleRegistry.register(this, this._props);
  }

  /**
   * Renders the component
   */
  public render() {
    //get the parent component
    const parent = this.getParentComponent();
    //if parent is not initiated, wait for it
    //(this is the hydration logic)
    if (parent && !parent.initiated) {
      return;
    //if it's already rendering
    } else if (this._rendering) {
      return;
    }
    //set the rendering flag
    this._rendering = true;
    //get the previous current component
    const prev = __APP_DATA__.get('current');
    //set the current component
    __APP_DATA__.set('current', this);
    //get the styles
    const styles = this.styles();
    //get the template
    if (!this._template) {
      //this will only initialize the variables once
      this._template = this.template();
    //there's a template, so it means it was mounted
    } else {
      //emit the unmounted event
      emitter.emit('unmounted', this);
    }
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
    //maybe we should do a queue later?
    if (prev) {
      __APP_DATA__.set('current', prev);
    } else {
      __APP_DATA__.delete('current');
    }
    this._initiated = true;
    //emit the mounted event
    emitter.emit('mounted', this);
    //reset the rendering flag
    this._rendering = false;
    return this.shadowRoot ? this.shadowRoot.innerHTML :this.innerHTML;
  }

  /**
   * Waits for the document to be first ready
   */
  public wait() {
    if (document.readyState !== 'loading') {
      this._update();
    } else {
      const next = () => {
        this._update();
        emitter.unbind('ready', next);
      };
      emitter.on('ready', next);
    }
  }

  /**
   * Converts a value to a node list
   * used to be inserted into the component
   * child list in template()
   */
  protected _toNodeList(value: any) {
    if (value instanceof Node) {
      return [ value ];
    }

    if (Array.isArray(value)) {
      if (value.every(item => item instanceof Node)) {
        return value;
      }
    }

    return [ TempleRegistry.createText(String(value)) ];
  }

  /**
   * Sets the initial properties and children
   */
  protected _update() { 
    //if children are not set
    if (typeof this._children === 'undefined') {
      this._children = Array.from(this.childNodes || []);
    }
    //settings props will try to trigger a render
    const element = this.element;
    if (element) {
      this.props = Object.assign({}, element.attributes);
      this.render();
    }
    //only render if not initiated
    if (!this._initiated) {
      this.render();
    }
  }
}