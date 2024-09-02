import type { Node, Hash } from '../types';
import TempleText from './TempleText';
import TempleElement from './TempleElement';

export default class TempleRegistry {
  /**
   * Creates a new TempleElement instance
   */
  public static createElement(
    name: string, 
    attributes: Hash, 
    children: Node[] = []
  ) {
    return new TempleElement(name, attributes, children);
  }

  /**
   * Creates a new TempleText instance
   */
  public static createText(value: string, escape = true) {
    return new TempleText(value, escape);
  }
}