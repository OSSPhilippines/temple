import data from './data';
/**
 * Server props shim
 */
export default function props<T = Record<string, any>>() {
  return (data.get('props') || {}) as T;
}