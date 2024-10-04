---
title: Filter a JavaScript object's properties by keys or values
shortTitle: Filter object keys or values
language: javascript
tags: [object]
cover: leafy-screens
excerpt: Learn how to transform objects by filtering their properties based on an array of keys or a predicate function.
listed: true
dateModified: 2024-01-14
---

The API JavaScript provides for arrays is very rich, but the same cannot be said for objects. This is understandable since the methods that can be applied on an object must not clash with the object's properties.

Still, what is provided as part of the `Object` API is very minimal, so we have to build on top of it, if we want to do more complex operations. One such use-case is **filtering an object's properties** based on an array of keys or a predicate function.

## Filter object properties by key

Given an object, we want to filter its properties based on an **array of keys**. The result should be a **new object** with only the properties whose keys are included in the array.

To accomplish this, we will leverage `Object.entries()` to get an array of the object's key-value pairs, then use `Array.prototype.filter()` to filter the key-value pairs based on the provided array. Finally, using `Object.fromEntries()` we can convert the filtered key-value pairs back to an object.

We can also implement the **inverse operation**, where we filter out the properties whose keys are included in the array. This can be done by simply negating the condition in the `Array.prototype.filter()` callback.

```js
const pick = (obj, arr) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));

const omit = (obj, arr) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !arr.includes(k)));

const obj = { a: 1, b: '2', c: 3 };

pick(obj, ['a', 'c']); // { 'a': 1, 'c': 3 }
omit(obj, ['b']); // { 'a': 1, 'c': 3 }
```

## Filter object properties conditionally

The previous code snippet covers most simple use-cases, but what if we want to filter the object's properties based on a **predicate function**? For example, we might want to filter out all the properties whose values are numbers.

This isn't particularly difficult to implement, either. We'll simply replace the check for the array inclusion with a call to the provided predicate function. In order to make the API of our function more user-friendly, the predicate should expect the **value as the first argument** and the key as the second one.

```js
const pickBy = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).filter(([k, v]) => fn(v, k)));

const omitBy = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).filter(([k, v]) => !fn(v, k)));

const obj = { a: 1, b: '2', c: 3 };

pickBy(obj, x => typeof x === 'number'); // { a: 1, c: 3 }
omitBy(obj, x => typeof x !== 'number'); // { a: 1, c: 3 }
```
