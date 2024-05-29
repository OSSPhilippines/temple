import data from './data';

/**
 * Get the current props of the component 
 * where this is being called from
 * ie. const { message } = props<{ message: string }>();
 */
export default function props<T = Record<string, any>>() {
  return data.get<{ props: T }>('current') || {};
}