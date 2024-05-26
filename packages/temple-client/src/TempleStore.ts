/**
 * HashStore easily manipulates object data
 */
export default class TempleStore extends Map<string|number, any> {
  /**
   * Returns the raw data
   */
  get data(): Record<string, any> {
    return Object.fromEntries(this);
  }

  /**
   * Returns the length
   */
  get length(): number {
    return this.size;
  }

  /**
   * Safely sets the data
   */
  set data(data: Record<string, any>) {
    Object.entries(data).forEach(([key, value]) => {
      this.set(key, value);
    })
  }

  /**
   * Sets the initial data
   */
  constructor(data: Record<string, any> = {}) {
    super(Object.entries(data));
  }

  /**
   * Loops though the data of a specified path
   */
  async each(...path: any[]): Promise<boolean> {
    const callback = path.pop() as Function;
    let list = this.get(...path);

    if (!list
      || Array.isArray(list) && !list.length
      || typeof list === 'string' && !list.length
      || typeof list === 'object' && !Object.keys(list).length
    ) {
      return false;
    }

    for(let key in list) {
      if ((await callback(list[key], key)) === false) {
        return false;
      }
    }

    return true;
  }

  /**
   * Retrieves the data hashd specified by the path
   */
  get<T = any>(...path: Index[]): Record<string, any>|T|undefined {
    if (!path.length) {
      return this.data;
    }

    if (!this.has(...path)) {
      return undefined;
    }

    if (path.length === 1) {
      return super.get(path[0] as string) as T;
    }

    const last = path.pop() as Index;
    let pointer = this.data;

    path.forEach(step => pointer = pointer[step]);

    return pointer[last] as T;
  }

  /**
   * Returns true if the specified path exists
   */
  has(...path: Index[]): boolean {
    if (!path.length) {
      return false;
    }

    if (path.length === 1) {
      return super.has(path[0] as string);
    }

    let found = true;
    const last = path.pop() as Index;
    let pointer = this.data;

    path.forEach(step => {
      if (!found) {
        return;
      }

      if (typeof pointer[step] !== 'object') {
        found = false;
        return;
      }

      pointer = pointer[step];
    });

    return !(!found || typeof pointer[last] === 'undefined');
  }

  /**
   * Removes the data from a specified path
   */
  remove(...path: Index[]) {
    if (!path.length) {
      return this;
    }

    if (!this.has(...path)) {
      return this;
    }

    if (path.length === 1) {
      super.delete(path[0] as string);
      return this;
    }

    const last = path.pop() as Index;
    let pointer = this.data;

    path.forEach(step => {
      pointer = pointer[step];
    })

    delete pointer[last];

    return this;
  }

  /**
   * Sets the data of a specified path
   */
  set(...path: any[]) {
    if (path.length < 1) {
      return this;
    } else if (path.length === 1) {
      if (typeof path[0] === 'object') {
        Object.entries(path[0]).forEach(([key, value]) => {
          this.set(key, value);
        });
      }
      return this;
    } else if (path.length === 2) {
      super.set(path[0] as string, path[1]);
      return this;
    }

    const value = path.pop();
    let last = path.pop(), pointer = this.data;

    path.forEach((step, i) => {
      if (step === null || step === '') {
        path[i] = step = Object.keys(pointer).length;
      }

      if (typeof pointer[step] !== 'object') {
        pointer[step] = {};
      }

      pointer = pointer[step];
    });

    if (last === null || last === '') {
      last = Object.keys(pointer).length;
    }

    pointer[last] = value;

    //loop through the steps one more time fixing the objects
    pointer = this.data;
    path.forEach((step) => {
      const next = pointer[step]
      //if next is not an array and next should be an array
      if (!Array.isArray(next) && shouldBeAnArray(next)) {
        //transform next into an array
        pointer[step] = makeArray(next);
      //if next is an array and next should not be an array
      } else if (Array.isArray(next) && !shouldBeAnArray(next)) {
        //transform next into an object
        pointer[step] = makeObject(next);
      }

      pointer = pointer[step];
    });

    return this;
  }
}

/**
 * Transforms an object into an array
 */
function makeArray(object: Record<string, any>): any[] {
  const array: any[] = [];
  const keys = Object.keys(object);
  
  keys.sort();
  
  keys.forEach(function(key) {
    array.push(object[key]);
  })

  return array;
}

/**
 * Transforms an array into an object
 */
function makeObject(array: any[]): Record<string, any> {
  return Object.assign({}, array);
}

/**
 * Returns true if object keys is all numbers
 */
function shouldBeAnArray(object: Record<string, any>): boolean {
  if (typeof object !== 'object') {
    return false;
  }

  const length = Object.keys(object).length

  if (!length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (typeof object[i] === 'undefined') {
      return false;
    }
  }

  return true;
}

//types
export interface NestedObject<T = any> {
  [key: string]: T|NestedObject<T>;
};
export type Scalar = string|number|boolean|null;
export type ScalarHash = NestedObject<Scalar>;
export type ScalarInput = Scalar|Scalar[]|ScalarHash;
export type Index = string|number;
export type FileType = {
  data: Buffer|string;
  name: string;
  type: string;
}