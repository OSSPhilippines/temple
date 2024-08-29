declare global { 
  interface Window {
    __APP_DATA__: Record<string, any>
  }
}

//we need to do it like this so different
//files can use the same instance

//some data that will be stored are:
// - current component (current)
// - server props (props)
// - markup attribues (bindings)
// - environment variables (env)

export class TempleDataMap extends Map<string, any> {
  constructor() {
    super(Object.entries(window.__APP_DATA__ || {}));
  }
  clear() {
    super.clear();
    window.__APP_DATA__ = {};
    return this;
  }
  delete(key: string): boolean {
    const results = super.delete(key);
    delete window.__APP_DATA__[key];
    return results;
  }
  get(key: string): any {
    if (!super.has(key) && window.__APP_DATA__[key]) {
      super.set(key, window.__APP_DATA__[key]);
    }
    return super.get(key);
  }
  set(key: string, value: any) {
    super.set(key, value);
    window.__APP_DATA__[key] = value;
    return this;
  }
}

const data = new TempleDataMap();

export default data;