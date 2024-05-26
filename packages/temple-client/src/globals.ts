import TempleStore from './TempleStore';

declare global { 
  interface Window {
    __GLOBAL_PROPS__: Record<string, any>,
    __BINDINGS__: Record<number, Record<string, any>>
  }
}

if (!window.__GLOBAL_PROPS__) {
  window.__GLOBAL_PROPS__ = {};
}

if (!window.__BINDINGS__) {
  window.__BINDINGS__ = {};
}

//The server will pass data to the browser using a <script> in the head.
//This data will be stored in a global variable window.__GLOBAL_PROPS__.
export const globalNamespace = '__GLOBAL_PROPS__';

//the key to look for in the globals
//to hyrdate the attributes for this component
export const bindingNamespace = '__BINDINGS__';

/**
 * Global props
 * ie. globals.set('message', 'Hello World');
 *    console.log(globals.get('message')); //Hello World
 */
export const globals = new TempleStore(window.__GLOBAL_PROPS__);

/**
 * Global props
 * ie. globals.set('message', 'Hello World');
 *    console.log(globals.get('message')); //Hello World
 */
export const bindings = new TempleStore(window.__BINDINGS__);