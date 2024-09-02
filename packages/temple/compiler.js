const compiler = require('./dist/compiler');
module.exports = compiler.default
Object.assign(module.exports, compiler);