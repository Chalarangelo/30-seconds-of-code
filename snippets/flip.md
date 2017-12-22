### Flip

Flip recieves a function the make the first argument the last

Returning a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest

```js
const flip = fn => (...args) =>
  fn( args.pop(), ...args )
/*
var a = {name: "John Smith"}
var b = {}
const mergeFrom = flip(Object.assign)
let mergePerson = mergeFrom.bind(a)
mergePerson(b) // == b
b = {}
Object.assign(b,a) // == b
*/
```
