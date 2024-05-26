export type Node = Element | TextNode;

function escapeHTML(html: string) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const selfClosingTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

export class CustomElement {
  protected _registry = new Map<string, Element>();
  
  define(name: string, element: Element) {
    this._registry.set(name, element);
  }

  public getElement(name: string) {
    return this._registry.get(name);
  }
}

export class TextNode {
  protected _nodeType = 3;
  protected _nodeName = '#text';
  protected _value = '';
  protected _parentNode: Element | null = null;

  public get length() {
    return this._value.length;
  }

  public get nodeName() {
    return this._nodeName;
  }

  public get nodeType() {
    return this._nodeType;
  }

  public get nodeValue() {
    return this._value;
  }

  public get parentNode() {
    return this._parentNode;
  }

  public get textContent() {
    return escapeHTML(this._value || '');
  }

  public set nodeValue(value: string) {
    this._value = value;
  }

  public set parentNode(parent: Element | null) {
    this._parentNode = parent;
  }
}

// Need to shim these:
//HTMLElement.innerHTML
//HTMLElement.innerHTML = `<x-custom></x-custom>`
//HTMLElement.content (HTMLElement)
//HTMLElement.content.querySelector(`x-custom`)
//HTMLElement.attachShadow
//HTMLElement.shadowRoot
//HTMLElement.shadowRoot.textContent
//HTMLElement.textContent
//HTMLElement.appendChild
//HTMLElement.nextSibling
//HTMLElement.attributes
//HTMLElement.querySelector
//HTMLElement.querySelectorAll('*')
export class Element extends TextNode {
  protected _nodeType = 1;
  protected _nodeName = '';
  protected _attributes = new Map<string, string>();
  protected _children: Node[] = [];
  protected _lastChildren: Node[] = [];
  protected _shadowRoot: ShadowRoot | null = null;
  protected _parentNode: Element | null = null;

  public get content() {
    return {
      querySelector: (selector: string) => {
        return this._children.find(
          child => child instanceof Element 
            && child.nodeName === selector
        );
      }
    };
  }

  public get nodeName() {
    return this._nodeName;
  }

  public get nodeType() {
    return this._nodeType;
  }

  public get attributes() {
    return Object.fromEntries(this._attributes);
  }

  public get children() {
    return this._children;
  }

  public get lastChildren() {
    return this._lastChildren;
  }

  public get parentNode() {
    return this._parentNode;
  }

  public get shadowRoot() {
    return this._shadowRoot;
  }

  public get textContent() {
    return this._children.map(child => child.textContent).join('');
  }

  public get innerHTML(): string {
    return this._lastInnerHTML(this._children);
  }

  public set innerHTML(html: string) {
    this._purge();
    if (html.length === 0) {
      return;
    }
    const matches = Array.from(html.matchAll(/<([^>]+)><\/[^>]+>/g));
    if (matches.length && matches[0].length > 1) {
      this.appendChild(document.createElement(matches[0][1]));
      return;
    }
  }

  public set parentNode(parent: Element | null) {
    this._parentNode = parent;
  }

  public set innerText(text: string) {
    this._purge();
    const node = new TextNode();
    node.nodeValue = text;
    this._children = [ node ];
  }

  public set textContent(text: string) {
    this._purge();
    const node = new TextNode();
    node.nodeValue = text;
    this._children = [ node ];
  }

  public set nodeName(name: string) {
    this._nodeName = name;
  }

  public attachShadow(options: { mode: 'open' }) {
    this._shadowRoot = new ShadowRoot();
    return this._shadowRoot;
  }

  public setAttribute(name: string, value: string) {
    this._attributes.set(name, value);
  }

  public getAttribute(name: string): string | null {
    return this._attributes.get(name) || null;
  }

  public appendChild(child: Node) {
    child.parentNode = this;
    this._children.push(child);
  }

  public nextSibling() {
    if (this.parentNode) {
      const index = this.parentNode.children.indexOf(this);
      return this.parentNode.children[index + 1] || null;
    }
    return null;
  }

  public querySelector(selector: string) {
    return this.querySelectorAll(selector)[0] || null;
  }

  public querySelectorAll(selector: string) {
    const matches: Element[] = [];
    const parts = selector.split(' ');
    const [first, ...rest] = parts;
    if (first === '*') {
      for (const child of this.children) {
        if (child instanceof Element) {
          matches.push(...child.querySelectorAll(rest.join(' ')));
        }
      }
    } else {
      for (const child of this.children) {
        if (child instanceof Element && child.nodeName === first) {
          if (rest.length > 0) {
            matches.push(...child.querySelectorAll(rest.join(' ')));
          } else {
            matches.push(child);
          }
        }
      }
    }
    return matches;
  }

  private _lastInnerHTML(children: Node[]): string {
    return children.map(child => {
      if (child instanceof Element) {
        const name = child.nodeName.toLowerCase();
        let tag = `<${name}`;
        //add attributes
        Object.entries(child.attributes).forEach(([key, value]) => {
          if (key !== 'children' && typeof value === 'string') {
            tag += ` ${key}="${value}"`;
          }
        });
        if (selfClosingTags.includes(name)) {
          return `${tag} />`;
        //if the element is a custom element
        } else if (customElements.getElement(name)) {
          //dont render the innerHTML
          return `${tag}>${this._lastInnerHTML(child.lastChildren)}</${name}>`;
        }
        return `${tag}>${child.innerHTML}</${name}>`;
      } else if (child instanceof TextNode) {
        return child.textContent;
      }
      return '';
    }).join('');
  }

  private _purge() {
    if (Array.isArray(this._children)) {
      this._lastChildren = this._children;
    }

    this._children = [];
  }
}

export class ShadowRoot extends Element {}

// Need to shim these:
//document.createElement
//document.createTextNode
//document.body
//document.readyState (loading, interactive, complete)
//document.addEventListener
export class Document {
  protected _body: Element | null = null;
  public createElement(name: string) {
    const element = new Element();
    element.nodeName = name;
    return element;
  }

  public createTextNode(text: string) {
    const node = new TextNode();
    node.nodeValue = text;
    return node;
  }

  public get body() {
    if (!this._body) {
      this._body = this.createElement('body');
    }
    return this._body;
  }

  public get readyState() {
    return 'complete';
  }

  public addEventListener() {
    // Do nothing
  }
}

// Need to shim these:
//window.__GLOBAL_PROPS__
export class Window {
  public __GLOBAL_PROPS__: Record<string, any> = {};
}

const window = new Window();
const document = new Document();
const customElements = new CustomElement();
const HTMLElement = Element;

export {
  window,
  document,
  customElements,
  HTMLElement
};