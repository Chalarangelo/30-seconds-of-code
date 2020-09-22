---
title: unflattenObject
tags: object,advanced
---

Unflatten an object with the paths for keys.

- Iterate over the object keys using `Object.keys(obj)` and `Array.prototype.forEach()`.
- Split each key with a dot delimiter (`.`) using `Array.prototype.split('.')`and use `Array.prototype.reduce()` to convert flattened paths to leaf node.
- If the current accumulator already contains value against a particular key, return its value as the next accumulator.
- Otherwise, add the appropriate key-value pair to the accumulator object and return value as the accumulator.


```js
const unflattenObject = obj =>{
    var result = {}
    Object.keys(obj).forEach((k)=>{
      var keys = k.split('.')
      keys.reduce(function(acc, e, i) {
        return acc[e] || (acc[e] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 === i ? obj[k] : {}) : [])
      }, result)
    })
    return result
}
```

```js
unflattenObject({ 'a.b.c': 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }
unflattenObject({ 'a.b': 1, 'a.c': 2, d: 3 }); // { a: { b: 1, c: 2 }, d: 3 }
unflattenObject({ 'a.b.0': 8, d: 3 }) //{ a: { b: [ 8 ] }, d: 3 }
```
