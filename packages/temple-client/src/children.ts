import type TempleComponent from './TempleComponent';
import data from './data';

/**
 * Returns an array of children from the current component
 * ie. <div>{children()}</div>
 */
export default function children(component: TempleComponent|null = null) {
  //if no component
  if (!component) {
    //try getting the current component from global
    component = data.current || null;
  }

  return component ? component.originalChildren || [] : [];
}