import type { Node } from '../types';
export default class TempleCollection {
  //elements in the collection
  protected _elements = new Set<Node>();

  /**
   * Creates a new TempleCollection instance
   */
  public constructor(elements: Node[] = []) {
    elements.forEach(element => this._elements.add(element));
  }

  /**
   * Adds a new element to the collection
   */
  public add(element: Node) {
    this._elements.add(element);
  }

  /**
   * Returns the collection elements
   */
  public toArray() {
    return Array.from(this._elements);
  }
  
  /**
   * Renders the collection to string
   */
  public toString() {
    return Array
      .from(this._elements)
      .filter(Boolean)
      .map(child => child.toString())
      .join('');
  }
}