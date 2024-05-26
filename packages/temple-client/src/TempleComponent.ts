import TempleElement from './TempleElement';
import TempleEmitter from './TempleEmitter';
import { globals, bindings  } from './globals';

//common type
export type Hash = Record<string, any>;

export default abstract class TempleComponent extends HTMLElement {
  //current component
  protected static _current: TempleComponent|null = null;
  //total number of components created
  protected static _total = 0;
  //name of the component
  public static component: [ string, string ];

  /**
   * Returns the current component
   */
  public static get current() {
    return TempleComponent._current;
  }

  //the id of the component
  //NOTE: the id is undefined on the server
  protected _id: number;
  //whether the component has initiated
  //this is a flag used by signals to check
  //the number of signals that exists
  //in this component
  protected _initiated: boolean = false;
  //the callback to render just the children 
  //(wo initializing the variables again)
  protected _template: (() => (Element|false)[])|null = null;
  //the initial children
  protected _children: ChildNode[]|undefined = undefined;

  /**
   * Returns the component styles
   */
  public abstract styles(): string;

  /**
   * Returns the component template
   */
  public abstract template(): () => (Element|false)[];

  /**
   * Returns the component's names
   */
  public get component() {
    return (this.constructor as typeof TempleComponent).component;
  }

  /**
   * Returns the original component's children
   * before the component was initiated
   */
  public get originalChildren() {
    return this._children;
  }

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
  public set props(props: Hash) {
    //clone the props
    const properties = Object.assign({}, props);
    //loop through the props
    for (const [ name, value ] of Object.entries(props)) {
      //check data being passed from server to browser
      //if this is a literal value
      if (typeof value === 'string') {
        if (value.startsWith('data:')) {
          let decoded: any = value.substring(5);
          if (value === 'true') {
            decoded = true;
          } else if (value === 'false') {
            decoded = false;
          } else if (value === 'null') {
            decoded = null;
          }
          properties[name] = decoded;
        } else if (value.startsWith('global:')) {
          const key = value.substring(7);
          if (globals.has(key)) {
            properties[name] = globals.get(key);
          }
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
    this._id = ++TempleComponent._total;
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
    TempleComponent._current = null;
    this._initiated = true;
    //emit the render event
    TempleEmitter.emit('render', this);
    return this.shadowRoot ? this.shadowRoot.innerHTML :this.innerHTML;
  }

  /**
   * Waits for the document to be first ready
   */
  public wait() {
    if (document.readyState !== 'loading') {
      this._update();
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (document.readyState !== 'loading') {
          this._update();
          mutationObserver.disconnect();
        }
      });
      mutationObserver.observe(document.body, { childList: true });
    }
  }

  /**
   * Sets the initial properties and children
   */
  protected _update() { 
    //get the attributes natively set using `<input value="foo" />`
    const attributes: Hash = Object.fromEntries(
      Array.from(this.attributes).map(
        attribute => [ attribute.nodeName, attribute.nodeValue ]
      )
    );
    //look for non-string values in the bindings
    const data = bindings.data[String(this._id)];
    if (typeof data === 'object') {
      Object.assign(attributes, data);
    }
    //if children are not set
    if (typeof this._children === 'undefined') {
      this._children = Array.from(this.childNodes || []);
    }
    //if no children in the attributes
    if (!attributes.children) {
      attributes.children = this._children;
    }
    //settings props will try to trigger a render
    this.props = { ...this.props, ...attributes};
    //only render if not initiated
    if (!this._initiated) {
      this.render();
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

    return [ document.createTextNode(String(value)) ];
  }
}