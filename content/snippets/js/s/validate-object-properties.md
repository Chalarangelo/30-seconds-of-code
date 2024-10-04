---
title: Validate the properties of a JavaScript object
shortTitle: Validate object properties
language: javascript
tags: [object]
cover: symmetry-cloudy-mountain
excerpt: Check the properties of an object against an array of keys or another object to ensure they match.
listed: true
dateModified: 2024-03-25
---

Checking the **shape** of a JavaScript object is fairly common, especially as part of a validation process. Using JavaScript's built-in methods and APIs, you can easily validate the properties of an object against an array of keys or another object to ensure they match.

## Validate against an array of keys

Given an **array of keys**, you can use `Object.keys()` to compare the keys of an object to the specified array. This will ensure that the object contains only the keys specified in the array.

Depending on your needs, you can **loosely check** if the object keys exactly match the array or if they are a **subset** or **superset** of the array. All you need to use is `Array.prototype.every()` and `Array.prototype.includes()` to perform the checks.

```js
// All keys in the object are present in the specified array.
const keysAreValid = (obj, keys) =>
  Object.keys(obj).every(key => keys.includes(key));

// All keys in the specified array are present in the object.
const allKeysArePresent = (obj, keys) => {
  const objKeys = Object.keys(obj);
  return keys.every(key => objKeys.includes(key));
};

// Check if the keys of an object match the specified array.
const keysMatch = (obj, keys) =>
  keysAreValid(obj, keys) && allKeysArePresent(obj, keys);

const obj = { id: 1, name: 'apple', price: 1.2 };
const keys = ['id', 'name', 'price'];

keysAreValid(obj, keys); // true
keysAreValid(obj, [...keys, 'quantity']); // true

allKeysArePresent(obj, keys); // true
allKeysArePresent(obj, [...keys, 'quantity']); // false

keysMatch(obj, keys); // true
keysMatch(obj, [...keys, 'quantity']); // false
```

## Validate against another object

If you want to validate an object against **another object**, you simply need to **retrieve the keys** of the second object, using `Object.keys()`, and compare them to the keys of the first object. The rest of the process is the same as the previous example.

```js
const keysAreValid = (obj, keys) =>
  Object.keys(obj).every(key => keys.includes(key));

const allKeysArePresent = (obj, keys) => {
  const objKeys = Object.keys(obj);
  return keys.every(key => objKeys.includes(key));
};

const keysMatch = (obj, keys) =>
  keysAreValid(obj, keys) && allKeysArePresent(obj, keys);

// All keys in the target object are present in the source object.
const objectKeysAreValid = (obj, source) =>
  keysAreValid(obj, Object.keys(source));

// All keys in the source object are present in the target object.
const objectKeysArePresent = (obj, source) =>
  allKeysArePresent(obj, Object.keys(source));

// Check if the keys of the target object match the source object.
const objectKeysMatch = (obj, source) =>
  keysMatch(obj, Object.keys(source));

const target = { id: 1, name: 'apple', price: 1.2 };
const source = { id: 1, name: 'apple', price: 1.2 };

objectKeysAreValid(target, source); // true
objectKeysAreValid(target, { ...source, quantity: 10 }); // true

objectKeysArePresent(target, source); // true
objectKeysArePresent(target, { ...source, quantity: 10 }); // false

objectKeysMatch(target, source); // true
objectKeysMatch(target, { ...source, quantity: 10 }); // false
```

> [!NOTE]
>
> These functions only check the **presence of keys**. You may also need to [check if two objects have the same property keys and values](/js/s/match-object-properties) to ensure that the objects match exactly.
