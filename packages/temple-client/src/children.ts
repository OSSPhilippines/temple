import TempleComponent from './TempleComponent';

/**
 * Returns an array of children from the current component
 * ie. <div>{children()}</div>
 */
export default function children(component: TempleComponent|null = null) {
  if (!component) {
    component = TempleComponent.current;
  }

  return component ? component.originalChildren || [] : [];
}