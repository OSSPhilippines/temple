//we need to do it like this so different
//files can use the same instance
const data = new Map();

//some data that will be stored are:
// - current component (current)
// - server props (props)
// - markup attribues (bindings)
// - environment variables (env)

export default data;