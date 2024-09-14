import type { Node } from '../types';
import TempleCollection from './TempleCollection';

const selfClosingTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

export default class TempleElement {
  //name of the element <div>
  protected _name: string;
  //attributes of the element <div id="app">
  protected _attributes: Record<string, any> = {};
  //string props of the element used to bind data to the client
  protected _props: string;
  //children of the element <div><p></p></div>
  protected _children: TempleCollection;

  /**
   * Returns the attributes of the element
   */
  public get attributes() {
    return this._attributes;
  }

  /**
   * Returns the children of the element
   */
  public get children() {
    return this._children;
  }

  /**
   * Returns the name of the element
   */
  public get name() {
    return this._name;
  }

  /**
   * Returns the props of the element
   */
  public get props() {
    return this._props;
  }

  /**
   * Creates a new TempleElement instance
   */
  public constructor(
    name: string, 
    attributes: Record<string, any> = {},
    props = '',
    children: Node[] = []
  ) {
    this._name = name;
    this._attributes = attributes;
    this._props = props;
    this._children = new TempleCollection(children);
  }

  /**
   * Renders the element to string
   */
  public toString() {
    const entries = Object.entries(this._attributes);
    const attributes = entries.length > 0 
      ? ' ' + entries.map(([key, value]) => {
        if (typeof value === 'string' 
          && !/["<>\n]/.test(value)
        ) {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : '';
        }
      }).join(' ')
      : '';
    if (selfClosingTags.includes(this._name)) {
      return `<${this._name}${attributes} />`;
    }
    const children: string = this._children.toString();
    return `<${this._name}${attributes}>${children}</${this._name}>`;
  }
}