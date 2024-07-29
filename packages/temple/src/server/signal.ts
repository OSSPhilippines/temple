/**
 * Server signal shim
 */
export default function signal<T = any>(value: T) {
  const methods = {
    getter: () => property.raw as T,
    setter: (value: T) => value
  };
  //make a new payload
  const property = { 
    raw: value,
    getter(callback: () => T) {
      methods.getter = callback;
      return property;
    },
    setter(callback: (value: any) => T) {
      methods.setter = callback;
      return property;
    }
  };
  //define the access to the value
  Object.defineProperty(property, 'value', {
    get() {
      return methods.getter();
    },
    set(value: any) {
      property.raw = methods.setter(value);
    }
  });

  return property;
}