declare global { 
  interface Window {
    __APP_DATA__: Record<string, any>
  }
}

//we need to do it like this so different
//files can use the same instance
const data = new Map(
  Object.entries(window.__APP_DATA__ || {})
);

export default data;