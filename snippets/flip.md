### flip

Flip takes a function as an argument, then makes the first argument the last

Return a closure that takes variadic inputs, and splices the last argument to make it the first argument before applying the rest.

```js
const flip = fn => (...args) => fn(args.pop(), ...args)
/*
let a = {name: 'John Smith'}
let b = {}
const mergeFrom = flip(Object.assign)
let mergePerson = mergeFrom.bind(a)
mergePerson(b) // == b
b = {}
Object.assign(b, a) // == b
*/
```
