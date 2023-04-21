import * as a from './es6.a.mjs';
export let done = false;
console.log('在 b.js 之中， b.done = %j', a.done);
done = true;
console.log('b.js 执行完毕');
