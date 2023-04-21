import * as b from './es6.b.mjs';
export let done = false;
console.log('在 a.js 之中， b.done = %j', b.done);
done = true;
console.log('a.js 执行完毕');
