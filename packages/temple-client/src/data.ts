declare global { 
  interface Window {
    __APP_DATA__: Record<string, any>
  }
}
const data = window.__APP_DATA__ || {};

export default data;