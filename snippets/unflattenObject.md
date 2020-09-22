---
title: unflattenObject
tags: object,advanced
---

Unflatten an object with the paths for keys.

- Use nested `Array.prototype.reduce()` to convert the flat path to a leaf node.
- Split each key with a dot delimiter (`.`) using `Array.prototype.split('.')`and use `Array.prototype.reduce()` to add or objects against the keys.
- If the current accumulator already contains value against a particular key, return its value as the next accumulator.
- Otherwise, add the appropriate key-value pair to the accumulator object and return value as the accumulator.
```js
const unflattenObject = obj =>{
    return Object.keys(obj).reduce((res , k)=>{
      k.split('.').reduce(function(acc, e, i , keys) {
        return acc[e] || (acc[e] = isNaN(Number(keys[i + 1])) ? (keys.length - 1 === i ? obj[k] : {}) : []);
      }, res)
      return res;
    },{});
}
```

```js
unflattenObject({ 'a.b.c': 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }
unflattenObject({ 'a.b': 1, 'a.c': 2, d: 3 }); // { a: { b: 1, c: 2 }, d: 3 }
unflattenObject({ 'a.b.0': 8, d: 3 }) //{ a: { b: [ 8 ] }, d: 3 }
```
