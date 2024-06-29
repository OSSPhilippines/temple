import type TempleComponent from './TempleComponent';
import data from './data';

/**
 * Get the current props of the component 
 * where this is being called from
 * ie. const { message } = props<{ message: string }>();
 */
export default function props<
  T = Record<string, any>
>(component: TempleComponent|null = null) {
  //if no component
  if (!component) {
    //try getting the current component from global
    component = data.get('current') || null;
  }

  if (component) {
    return component.props as T;
  }
  return {};
}