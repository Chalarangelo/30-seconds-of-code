### collectInto

Changes a function that accepts an array into a variadic function.

Given a function, return a closure that collects all inputs into an array-accepting function.

```js
const collectInto = fn => ( ...args ) => fn( args );
/*
const Pall = collectInto( Promise.all.bind(Promise) )
var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = new Promise((resolve) => setTimeout(resolve,2000,3))
Pall(p1, p2, p3).then(console.log)
*/
```
