import type TempleComponent from './TempleComponent';
import data from './data';

export function innerHTML(component: TempleComponent|null = null) {
  const inner = children(component);
  const wrapper = document.createElement('template');
  wrapper.append(...inner);
  return wrapper.innerHTML;
}

/**
 * Returns an array of children from the current component
 * ie. <div>{children()}</div>
 */
export default function children(component: TempleComponent|null = null) {
  //if no component
  if (!component) {
    //try getting the current component from global
    component = data.get('current') || null;
  }

  return component ? component.originalChildren || [] : [];
}