import type { Node } from './types';

import TempleText from './TempleText';
import TempleElement from './TempleElement';

export default class TempleDocument {
  //prefix brand
  protected static _brand = 'temple';

  /**
   * Sets the brand prefix
   */
  public static set brand(value: string) {
    this._brand = value;
  }

  /**
   * Creates a new TempleElement instance
   */
  public static createElement(
    name: string, 
    attributes: Record<string, any>, 
    children: Node[] = []
  ) {
    return new TempleElement(name, attributes, children);
  }

  /**
   * Creates a new TempleElement instance
   */
  public static createComponent(
    name: string, 
    attributes: Record<string, any>, 
    children: Node[] = []
  ) {
    //get the tagname for the component
    const tagname = this._brand.length > 0 
      ? `${this._brand}-${name}`
      : name;
    return new TempleElement(tagname, attributes, children);
  }

  /**
   * Creates a new TempleText instance
   */
  public static createText(value: string) {
    return new TempleText(value);
  }
}