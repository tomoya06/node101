exports.done = false;
var b = require('./cjs.a.js');
console.log('在 b.js 之中， a.done = %j', b.done);
exports.done = true;
console.log('b.js 执行完毕');
