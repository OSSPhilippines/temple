import type { 
  Hash, 
  CustomEventListener, 
  TempleComponentClass 
} from '../types';
import type TempleElement from './TempleElement';

import TempleException from '../Exception';
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
   * Returns the registered element name from customElements
   * if it doesn't exist, it will return null
   */
  public static get registered() {
    return customElements.getName(this as unknown as CustomElementConstructor);
  }

  /**
   * Self registers the component
   */
  public static register() {
    customElements.define(
      this.component[0], 
      this as unknown as CustomElementConstructor
    );
  }

  //the initial children
  protected _children: Node[]|undefined = undefined;
  //whether the component has initiated this is a flag 
  //used by signals to check the number of signals that 
  //exists in this component as logic to determine
  //whether to create a signal or reuse an existing one
  protected _initiated = false;
  //attribute observer
  protected _observer: MutationObserver|null = null;
  //prevents rendering loops
  protected _rendering = false;
  //the callback to render just the children 
  //(wo initializing the variables again)
  protected _template: (() => (Element|false)[])|null = null;
  //whether if this is a virtual component
  protected _virtual = false;

  /**
   * Returns the component styles
   */
  public abstract styles(): string;

  /**
   * Returns the component template
   */
  public abstract template(): () => (Element|false)[];

  /**
   * Returns the component native attributes in native object form
   */
  public get attr() {
    return Object.fromEntries(
      Array.from(this.attributes).map(
        attr => [attr.name, attr.value]
      )
    );
  }

  /**
   * Returns the component's element registry
   */
  public get element(): TempleElement {
    //check to see if the registry has this component
    if (!TempleRegistry.has(this)) {
      //it should have...
      throw TempleException.for(
        'Component %s not mapped.', 
        this.metadata.classname
      );
    }
    return TempleRegistry.get(this) as TempleElement;
  }

  /**
   * Returns the component's metadata
   */
  public get metadata() {
    const { 
      component, 
      registered, 
      //@ts-ignore some components might 
      //not have observed attributes...
      observedAttributes: observed = [] 
    } = this.constructor as typeof TempleComponent;
    //extract more names from component
    const [ tagname, classname ] = component;
    //return all the static data collected
    return { 
      tagname, 
      classname, 
      registered, 
      observed: observed as string[] 
    };
  }

  /**
   * Returns the original component's children
   * before the component was initiated
   */
  public get originalChildren(): Node[]|undefined {
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
    return this.getAttributes();
  }

  /**
   * Returns the props except the dash 
   * keys are transformed to camel case
   */
  public get propsCamel() {
    return this.element.camel();
  }

  /**
   * Returns the props except the dash 
   * keys are transformed to sub objects
   */
  public get propsTree() {
    return this.element.tree();
  }

  /**
   * Returns whether the component is a virtual component
   */
  public get virtual() {
    return this._virtual;
  }

  /**
   * Sets the component properties
   */
  public set props(props: Hash) {
    this.setAttributes(props);
  }

  /**
   * Safely sets the original component's children
   */
  public set originalChildren(children: Node[]) {
    //if children are not set
    if (typeof this._children === 'undefined') {
      this._children = Array.from(children || []);
    }
  }

  /**
   * This is called only from customElements 
   * when the component is created
   */
  public constructor() {
    super();
    //if the component is not registered
    if (!TempleRegistry.has(this)) {
      //this came from a native createElement
      const { registered } = this.metadata;
      if (!registered) {
        // What?!? how....
        throw TempleException.for(
          'Component %s not registered in customElements.', 
          this.metadata.classname
        );
      }
      //get all attributes
      const attributes = Object.fromEntries(
        Array.from(this.attributes).map(
          attr => [ attr.name, attr.value !== '' ? attr.value : true ]
        )
      );
      //register the component
      TempleRegistry.register(this, attributes);
    }
  }

  /**
   * Called when component moved to a new document
   */
  public adoptedCallback() {
    this.render();
    //emit the adopt event
    this.emit('adopt', this);
  }

  /**
   * Called when static observedAttributes is set and:
   * 1. setAttribute is called
   * 2. removeAttribute is called
   * 3. element.[attribute] is changed
   * 4. element.[attribute] is removed
   * 5. element.attributes is changed
   * 6. Attribute is changed via browser developer tools
   */
  public attributeChangedCallback(
    name: string, 
    prev: string|null, 
    next: string|null
  ) {
    //if it's rendering, do nothing
    if (this._rendering) {
      return;
    }
    //determine action
    const action = prev === null 
      ? 'add' : next === null 
      ? 'remove' : 'update';
    if (next === null && this.hasAttribute(name)) {
      this.element.removeAttribute(name);
    } else if (next === '') {
      this.element.setAttribute(name, true);
    } else {
      this.element.setAttribute(name, next);
    }
    //emit the attr event
    this.emit('attributechange', { action, name, prev, value: next, target: this });
  }

  /**
   * Called when the element is inserted into a document,
   */
  public connectedCallback() {
    //attributes are ready here
    this.wait();
    //emit the connect event
    this.emit('connect', this);
  }

  /**
   * Helper API to create a new component
   * and add to the registry
   */
  public createComponent(
    tagname: string,
    definition: TempleComponentClass, 
    attributes: Record<string, any>, 
    children: Element[] = []
  ) {
    return TempleRegistry.createComponent(
      tagname, 
      definition, 
      attributes, 
      children
    );
  }

  /**
   * Helper API to create a new HTML element
   * and add to the registry
   */
  public createElement(
    name: string, 
    attributes: Record<string, any>, 
    children: Element[] = []
  ) {
    return TempleRegistry.createElement(
      name, 
      attributes, 
      children
    );
  }

  /**
   * Called when the element is removed from a document
   */
  public disconnectedCallback() {
    //emit the disconnect event
    this.emit('disconnect', this);
  }

  /**
   * Emits an event
   */
  public emit<T = any>(event: string, detail?: T) {
    this.dispatchEvent(new CustomEvent<T>(event, { detail: detail }));
    return this;
  }

  /**
   * Returns the attribute value
   */
  public getAttribute(name: string) {
    return this.element.getAttribute(name);
  }

  /**
   * Returns the all the attributes
   */
  public getAttributes() {
    return Object.assign({}, this.element.attributes);
  }

  /**
   * Returns the children of the component
   * 
   * - if type is true, it will return  
   *   the current rendered childNodes
   * 
   * - if type is false, it will return 
   *   the original unrendered children
   * 
   * - if type is null, it will return the 
   *   current rendered shadowRoot childNodes
   */
  public getChildren(type: boolean|null = true) {
    if (type === true) {
      return Array.from(this.childNodes);
    } else if (type === false) {
      return this._children;
    } else if (type === null && this.shadowRoot) {
      return Array.from(this.shadowRoot.childNodes);
    }
    return [];
  }

  /**
   * Helper API to get attributes of an element
   * from the registry
   */
  public getElement(element: Element) {
    return TempleRegistry.get(element);
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
   * Returns whether the attribute exists
   */
  public hasAttribute(name: string) {
    return this.element.hasAttribute(name);
  }

  /**
   * Listens for an event
   */
  public on<T>(event: string, callback: CustomEventListener<T>) {
    this.removeEventListener(event, callback as unknown as EventListener);
    this.addEventListener(event, callback as unknown as EventListener);
    return this;
  }

  /**
   * Listens for an event once
   */
  public once<T>(event: string, callback: CustomEventListener<T>) {
    const unbinder: CustomEventListener<T> = e => {
      this.removeEventListener(event, callback as unknown as EventListener);
      callback(e);
    };
    this.on<T>(event, unbinder);
    return this;
  }

  /**
   * This is used in TempleRegistry.createComponent() to
   * create a virtual instance of the component. This is
   * used components that are used by other components,
   * but not registered in custom elements.
   */
  public register(attributes: Hash = {}, children: Element[] = []) {
    //check to see if the registry already has this component
    if (TempleRegistry.has(this)) {
      //NOTE: this technically should not be possible...
      const element = TempleRegistry.get(this) as TempleElement;
      element.setAttributes(attributes);
    } else {
      //it is not registered, so register it
      TempleRegistry.register(this, attributes);
    }
    //set attributes natively so it shows 
    //up in the markup when it's rendered
    for (const [ name, value ] of Object.entries(attributes)) {
      if (typeof value === 'string' || value === true) {
        super.setAttribute(name, (
          value === '' || value === name  || value === true
        ) ? true : value);
      }
    }
    //set the original children
    this._children = children;
    //NOTE: we need to append the children for shadow mode
    //since at this point, we dont know if shadow mode is 
    //enabled we need to append the children jic
    children.forEach(child => this.appendChild(child));
    //this is a virtual component
    //virtual components suffer from :not(:defined) selectors
    //because they are not registered in custom elements
    //NOTE: this doesnt have a particular purpose right now
    // but will be used to troubleshooting in the future
    this._virtual = true;
    //also virtual components do not auto render so
    //we need to manually connect in order to do that
    this.connectedCallback();
  }

  /**
   * Removes the attribute
   */
  public removeAttribute(name: string) {
    const prev = this.getAttribute(name);
    if (this.hasAttribute(name)) {
      this.element.removeAttribute(name);
    }
    if (super.hasAttribute(name)) {
      super.removeAttribute(name);
    }
    //if this is a virtual component and is an observed attribute
    if (this._virtual && this.metadata.observed.includes(name)) {
      //manually trigger the lifecycle
      this.attributeChangedCallback(name, prev, null);
    }
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
      //prevent infinite loops
      return;
    }
    //set the rendering flag
    this._rendering = true;
    //keep the previous current component 
    //to revert when we are done rendering
    const prev = __APP_DATA__.get('current');
    //set the current component pointer
    //NOTE: this is a pointer for component 
    //related helpers like props and signals
    __APP_DATA__.set('current', this);
    //get the template
    if (!this._template) {
      //this will only initialize the variables once
      this._template = this.template();
    //there's a template, so it means it was mounted
    } else {
      //emit the unmounted event to allow any cleanup
      //like removing event listeners or clearing timeouts
      //to happen before the children are overwritten
      emitter.emit('unmounted', this);
    }
    //get the children build w/o re-initializing the variables
    //this is why we dont need memoization strategies
    const children = this._template().filter(Boolean) as Node[];
    //get the styles now to allow template() 
    //to dynamically change the styles
    const styles = this.styles();
    //determine rendering mode
    const mode = styles.length === 0 ? 'light' : 'shadow';
    //get children by modes
    const { light, shadow } = this._getChildren(children, mode);
    //if no styles, just set the innerHTML
    if (shadow.length === 0) {
      //empty the current text content
      //the old data is captured in originalChildren
      //NOTE: We might want to version the children based 
      //on the state like React...
      //but for now, good bye old children
      this.textContent = '';
      //now append the new children
      light.forEach(child => this.appendChild(child));
    //there are styles, use shadow dom because it doesn't make
    //sense in light mode because the styles will be applied
    //to the entire document...
    } else {
      //if shadow root is not set, create it
      if (!this.shadowRoot) {
        //NOTE: delegatesFocus is part of the ElementInternals API
        //it allows the shadow root to delegate focus to the element
        //and it doesn't hurt to set it to true
        this.attachShadow({ mode: 'open', delegatesFocus: true });
      }
      //make a style tag
      const style = document.createElement('style');
      //set the styles
      style.innerText = styles;
      //get the shadow root
      const shadowRoot = this.shadowRoot as ShadowRoot;
      //NOTE: dont do this.textContent = ''
      //because it will make <slot> useless
      //just empty the shadow root content
      shadowRoot.textContent = '';
      shadowRoot.appendChild(style);
      //append the children
      shadow.forEach(child => shadowRoot.appendChild(child));
      if (light.length) {
        //empty the current text content
        this.textContent = '';
        //append the light children
        light.forEach(child => this.appendChild(child));
      }
    }
    //revert or reset the current component pointer
    //maybe we should do a queue later?
    if (prev) {
      __APP_DATA__.set('current', prev);
    } else {
      __APP_DATA__.delete('current');
    }
    //set the initiated flag
    this._initiated = true;
    //reset the rendering flag
    this._rendering = false;
    //emit the mounted event
    emitter.emit('mounted', this);
    //return something (nothing is using this right now)
    return this.shadowRoot ? this.shadowRoot.innerHTML :this.innerHTML;
  }

  /**
   * Sets the attribute
   */
  public setAttribute(name: string, value: any) {
    const prev = this.getAttribute(name);
    if (value === '' || value === true) {
      this.element.setAttribute(name, true);
      super.setAttribute(name, '');
    } else if (value === false) {
      this.element.setAttribute(name, value);
      super.removeAttribute(name);
    } else if (typeof value === 'string') {
      this.element.setAttribute(name, value);
      super.setAttribute(name, value);
    } else {
      this.element.setAttribute(name, value);
      //dont set the super attribute if it's not a string
    }
    //if this is a virtual component 
    if (this._virtual 
      //and is an observed attribute
      && this.metadata.observed.includes(name) 
      //and the value is a string
      && typeof value === 'string'
  ) {
      //manually trigger the lifecycle
      this.attributeChangedCallback(name, prev, value);
    }
  }

  /**
   * Sets all the attributes
   */
  public setAttributes(attributes: Hash) {
    Object.entries(attributes).forEach(
      ([ key, value ]) => this.setAttribute(key, value)
    );
  }

  /**
   * Unbinds an event
   */
  public unbind(event: string, callback: EventListener) {
    this.removeEventListener(event, callback);
    return this;
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
   * For render(), this is used to split the 
   * children into light and shadow children
   */
  protected _getChildren(children: Node[], mode: 'light'|'shadow') {
    //split children into light, shadow and any
    const anyNodes = this._getTemplateNodes(children);
    const lightNodes = this._getTemplateNodes(children, 'light');
    const shadowNodes = this._getTemplateNodes(children, 'shadow');
    //determine the default children
    const defaultNodes = anyNodes.length > 0 ? anyNodes : children;
    //determine the light and shadow children
    return {
      light: lightNodes.length > 0 ? lightNodes 
        : mode === 'light' ? defaultNodes : [],
      shadow: shadowNodes.length > 0 ? shadowNodes 
        : mode === 'shadow' ? defaultNodes : []
    };
  }

  /**
   * Returns a guaranteed list of nodes
   * from a template based on the type
   */
  protected _getTemplateNodes(children: Node[], type?: string) {
    const template = children.find(
      child => this._isTemplate(child, type)
    ) as HTMLTemplateElement|null;
    if (!template) return [];
    //When a <template> is constructed programmatically, using 
    //appendChild, the content remains empty. it needs to be 
    //appended to the document in order for content to be useful. 
    //We just need to get the childNodes of the template.
    return Array.from(template.childNodes || []) as Node[];
  }

  /**
   * Returns whether a node is a template with a type
   */
  protected _isTemplate(child: Node, type?: string) {
    if (child.nodeName !== 'TEMPLATE') return false;
    const template = child as HTMLTemplateElement;
    if (!type) return !template.hasAttribute('type');
    return type === template.getAttribute('type');
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
    //only render if not initiated
    if (!this._initiated) {
      this.render();
    }
  }
}