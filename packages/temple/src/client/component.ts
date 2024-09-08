import type TempleComponent from './TempleComponent';
import Exception from '../Exception';
import data from './data';

/**
 * Get the current props of the component 
 * where this is being called from
 * ie. const self = component();
 */
export default function component(
  component: TempleComponent|string|null = null, 
  nullable = false
) {
  //if no component
  if (!component) {
    //try getting the current component from global
    component = data.get('current');
    //if still no component
    if (!component) {
      if (!nullable) {
        throw Exception.for('Not called within a Temple component');
      }
      return null;
    }
  }
  
  return component;
}