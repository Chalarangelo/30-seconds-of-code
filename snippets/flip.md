### Flip

Flip recieves a function the make the first argument the last

Returning a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest

```js
const flip = fn => (...args) =>
  fn( args.pop(), ...args )
/*
var a = {}
var b = {test:1}
const mergeInto = flip(Object.assign)
mergeInto(a, b) // == b
Object.assign(b,a) // == b
*/
```
