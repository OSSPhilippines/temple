import type { Node, Hash } from '../types';
import TempleText from './TempleText';
import TempleElement from './TempleElement';

export default class TempleRegistry {
  /**
   * Converts the markup to HTML
   */
  public static render(markup: Node[]) {
    return markup
      .filter(Boolean)
      .map(child => child.toString())
      .join('');
  }

  /**
   * Returns an ordered registry of all elements in the markup
   */
  public static registry(
    markup: Node[], 
    registry = new Set<TempleElement>()
  ) {
    markup.forEach(node => {
      if (node instanceof TempleElement) {
        if (!['html', 'head', 'body'].includes(node.name)) {
          registry.add(node);
        }
        if (node.name !=='head' && node.children.length > 0) {
          this.registry(node.children.toArray(), registry);
        }
      }
    });
    return registry;
  }

  /**
   * Creates a new TempleElement instance
   */
  public static createElement(
    name: string, 
    attributes: Hash, 
    props: string,
    children: Node[] = []
  ) {
    return new TempleElement(name, attributes, props, children);
  }

  /**
   * Creates a new TempleText instance
   */
  public static createText(value: string, escape = true) {
    return new TempleText(value, escape);
  }
}