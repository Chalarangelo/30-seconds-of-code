---
title: Merge two or more JavaScript objects
shortTitle: Merge objects
language: javascript
tags: [object,array]
cover: guitar-living-room
excerpt: Learn how to combine two or more objects into a single object in JavaScript.
listed: true
dateModified: 2024-03-20
---

JavaScript arrays are fairly easy to merge, using the spread operator (`...`) or `Array.prototype.concat()`. Merging objects, however, is a little more complex, but can be done if you know the right techniques.

## Built-in methods

Both the spread operator (`...`) and `Object.assign()` can be used to merge two or more objects into a single object. However, these methods only perform a **shallow merge**, meaning that nested objects are not merged. They also have the drawback of **overwriting properties with the same key**.

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = { ...obj1, ...obj2 };
// { a: 1, b: 3, c: 4 }

const merged2 = Object.assign({}, obj2, obj1);
// { b: 2, c: 4, a: 1 }
```

## Combining values with the same key

Instead of overwriting properties with the same key, we usually want to combine their values. This can be done by **checking if the key already exists** in the resulting object and appending the value to an array if it does.

In order to perform this, we can use `Object.keys()` to **iterate** over all objects and keys, and `Object.prototype.hasOwnProperty()` to check if the key already exists in the resulting object. Then, we can use `Array.prototype.concat()` to **append** the values for keys that exist in multiple objects. This also allows us to preserve single values, if they only exist in one object.

```js
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

const obj1 = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const obj2 = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
};

merge(obj1, obj2);
// {
//   a: [ { x: 2 }, { y: 4 }, { z: 3 } ],
//   b: [ 1, 2, 3 ],
//   c: 'foo'
// }
```

## Deeply merging objects

If you need to merge objects that contain **nested objects**, you might want to handle nested values differently. This can be done by passing a function that handles the merging of individual keys, allowing you to **customize the merging process**. You may, for example, want to merge arrays or objects, or overwrite values for certain keys.

In order to do so, we can use `Object.keys()` to get the keys of both objects, create a `Set` from them, and use the spread operator (`...`) to create an **array of all the unique keys**. We can then use `Array.prototype.reduce()` to add each unique key to the object, using the provided function to combine the values of the two given objects.

```js
const deepMerge = (a, b, fn) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce(
    (acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }),
    {}
  );

const obj1 = {
  a: true,
  b: [1, 2, 3],
  c: { d: 4, e: 5 },
  f: 'foo',
};
const obj2 = {
  a: false,
  b: [4, 5, 6],
  c: { d: 6, g: 7 },
  f: 'bar',
};

const concatFn = (key, a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
  if (typeof a === 'object' && typeof b === 'object')
    return deepMerge(a, b, concatFn);
  if (typeof a === 'string' && typeof b === 'string') return [a, b].join(' ');
  return b ?? a;
};

deepMerge(obj1, obj2, concatFn);
// {
//   a: false,
//   b: [ 1, 2, 3, 4, 5, 6 ]
//   c: { d: 6, e: 5, g: 7 },
//   f: 'foo bar'
// }
```
