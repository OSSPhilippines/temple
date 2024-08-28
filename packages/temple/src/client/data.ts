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

const data = new Map(
  Object.entries(window.__APP_DATA__ || {})
);

export default data;