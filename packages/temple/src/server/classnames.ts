import props from './props';

/**
 * Get the current classnames where this is being called from
 * ie. const classes = classnames();
 */
export default function classnames() {
  return props<{'class': string}>()['class'];
}