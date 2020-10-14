---
title: mergeTwoObjects
tags: javascript, object, es6, intermediate
---

Using the ES6 _spread operator_, we can merge two JavaScript objects and create a **new object** that combines the properties.

- This is the perfect way to merge two **simple** objects into one.
- If both objects have a property with the same name, then the second object property overwrites the first one.
- If you need a deeper merge with recursively merging object properties and arrays, the best solution probably will be the `_.merge(object, [sources])` method by Lodash.

```js
const obj1 = {
  user: "Ann0nIp",
};

const obj2 = {
  age: 27,
};

const newObj = { ...obj1, ...obj2 };
```

```js
console.log(newObj); // { user: 'Ann0nIp', age: 27 }
```
