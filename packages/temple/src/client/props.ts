import type TempleComponent from './TempleComponent';
import getComponent from './component';
import data from './data';

/**
 * Get the current props of the component 
 * where this is being called from
 * ie. const { message } = props<{ message: string }>();
 */
export default function props<
  T = Record<string, any>
>(pointer: TempleComponent|'document'|null = null) {
  const component = getComponent(pointer, true);
  if (typeof component === 'string') {
    return data.get('props') || {};
  }
  return component ? component.props as T : {} as T;
}