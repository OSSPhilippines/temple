import TempleElement from './TempleElement';
import TempleEmitter from './TempleEmitter';

//The server will pass data to the browser using a <script> in the head.
//This data will be stored in a global variable window.__SERVER_PROPS__.
declare global { 
  interface Window {__SERVER_PROPS__: Record<string, any> }
}
const ServerProps = window.__SERVER_PROPS__;

export default abstract class TempleComponent extends HTMLElement {
  //current component
  protected static _current: TempleComponent|null = null;
  //name of the component
  public static component: [ string, string ];

  /**
   * Returns the current component
   */
  public static get current() {
    return TempleComponent._current;
  }

  //whether shadow mode is on
  protected _shadowRoot: ShadowRoot|null = null;
  //whether the component has initiated
  protected _initiated: boolean = false;
  protected _template: (() => (Element|false)[])|null = null;

  /**
   * Returns the component styles
   */
  public abstract styles(): string;

  /**
   * Returns the component template
   */
  public abstract template(): () => (Element|false)[];

  /**
   * Returns the component's element registry
   */
  public get element() {
    return TempleElement.get(this) as TempleElement;
  }

  /**
   * Returns the component properties
   */
  public get props() {
    return Object.assign({}, this.element.attributes);
  }

  /**
   * Returns whether the component has initiated
   */
  public get initiated() {
    return this._initiated;
  }

  /**
   * Sets the component properties
   */
  public set props(props: Record<string, any>) {
    //if the serialized props is the same as the current serialized props
    if (this.element.serialize(props) === this.element.serialize()) {
      //dont set
      return;
    }

    //clone the props
    const properties = Object.assign({}, props);
    //loop through the props
    for (const [ name, value ] of Object.entries(props)) {
      //check data being passed from server to browser
      //if this is a literal value
      if (value.startsWith('data:')) {
        let decoded = value.substring(5);
        if (value === 'true') {
          decoded = true;
        } else if (value === 'false') {
          decoded = false;
        } else if (value === 'null') {
          decoded = null;
        }
        properties[name] = decoded;
      } else if (value.startsWith('prop:')) {
        const key = value.substring(5);
        if (typeof ServerProps[key] !== 'undefined') {
          properties[name] = ServerProps[key];
        }
      }
    }

    this.element.setAttributes(properties);
    this.render();
  }

  /**
   * Add this component to the overall registry
   */
  public constructor() {
    super();
    TempleElement.register(this);
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
   * Renders the component
   */
  public render() {
    //set the current component
    TempleComponent._current = this;
    //get the styles
    const styles = this.styles();
    //get the template
    if (!this._template) {
      //this will only initialize the variables once
      this._template = this.template();
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
      if (!this._shadowRoot) {
        this._shadowRoot = this.attachShadow({ mode: 'open' });
      }
      //empty the current text content
      //the old data is captured in props
      this.textContent = '';
      this._shadowRoot.textContent = '';
      //append the styles
      const style = document.createElement('style');
      style.innerText = styles;
      this._shadowRoot.appendChild(style);
      //now append the children
      children.forEach(child => this._shadowRoot?.appendChild(child));
    }
    //reset the current component
    TempleComponent._current = null;
    this._initiated = true;
    //emit the render event
    TempleEmitter.emit('render', this);
  }

  /**
   * Returns true when the document is ready
   */
  protected ready() {
    // check if the parser has already passed the end tag of the component
    // in which case this element, or one of its parents, should have a nextSibling
    // if not (no whitespace at all between tags and no nextElementSiblings either)
    // resort to DOMContentLoaded or load having triggered
    const parents: ParentNode[] = [];
    // collect the parentNodes
    let el: ParentNode = this;
    while (el.parentNode) {
      el = el.parentNode;
      parents.push(el);
    }

    return [ this, ...parents ].some(element => element.nextSibling) 
      || document.readyState !== 'loading';
  }

  /**
   * Sets the initial properties and children
   */
  protected update(children: string) { 
    const entries = Object.fromEntries(
      Array.from(this.attributes).map(
        attribute => [ attribute.nodeName, attribute.nodeValue ]
      )
    );

    this.props = { ...this.props, ...entries, children };
  }

  /**
   * Waits for the document to be first ready
   */
  protected wait() {
    if (this.ready()) {
      this.update(this.innerHTML);
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (this.ready()) {
          this.update(this.innerHTML);
          mutationObserver.disconnect();
        }
      });
      mutationObserver.observe(document.body, { childList: true });
    }
  }
}