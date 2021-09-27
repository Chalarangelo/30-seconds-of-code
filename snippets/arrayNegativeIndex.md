---
title: arrayNegativeIndex
tags: array,index,negative
firstSeen: 2021-09-27T12:20:46+03:00
lastUpdated: 2021-09-27T13:46:13+02:00
---

Creates an array that supports negative indexes.

- Use `Proxy`, create a proxy for another object, which can intercept and redefine fundamental operations for that object.
- Use `Reflect.get()`, getting a property from an object.

```js
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}
```

```js
let arr = createArray('a', 'b', 'c');
arr[-1] // c
arr[-2] // b
```
