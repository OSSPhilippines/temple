import type TempleComponent from './TempleComponent';
import props from './props';

/**
 * Get the current classnames where this is being called from
 * ie. const classes = classnames();
 */
export default function classnames(component: TempleComponent|null = null) {
  return props<{'class': string}>(component)['class'];
}