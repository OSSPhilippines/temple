import TempleComponent from './TempleComponent';

/**
 * Get the current props of the component 
 * where this is being called from
 * ie. const { message } = props<{ message: string }>();
 */
export default function props<
  T = Record<string, any>
>(component?: TempleComponent) {
  if (component) {
    return component.props as T;
  } else if (TempleComponent.current) {
    return TempleComponent.current.props as T;
  }
  return {};
}