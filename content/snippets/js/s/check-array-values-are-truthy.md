---
title: Truth check all values in a JavaScript array
shortTitle: Truth check array
language: javascript
tags: [object,logic,array]
cover: digital-nomad-8
excerpt: Learn how to check if all values in an array are true or false.
listed: true
dateModified: 2023-11-06
---

As mentioned in [a previous article](/js/s/truthy-falsy-values), JavaScript uses **type coercion** in Boolean contexts, such as conditionals. This means that values are considered either **truthy or falsy** depending on how they are evaluated in a Boolean context. Combining this with [the `Boolean` function](/js/s/boolean-function) and truth checking a collection of values becomes a breeze.

## Check if all values in an array are truthy

Using `Array.prototype.every()`, we can easily check if all values in an array are truthy. The `Boolean` function can be used as a default callback to check if all values are truthy, but specifying a custom callback function is also possible.

```js
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

## Check if any values in an array are truthy

Using `Array.prototype.some()`, we can check if any values in an array are truthy. The `Boolean` function can be used as a default callback to check if any values are truthy, but specifying a custom callback function is also possible.

```js
const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
```

## Check if all values in an array are falsy

Similarly, `Array.prototype.some()` can be used to check if any values in an array are falsy. Again, the `Boolean` function can be used as the default callback, but you can also specify a custom callback function.

```js
const none = (arr, fn = Boolean) => !arr.some(fn);

none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true
```

## Check if all objects have a given property

Taking this one step further, `Array.prototype.every()` can be used to check if **all objects in an array have a given property**. This is useful for validating data, for example. Simply checking for the existence of a property will return a truthy or falsy value depending on whether the property exists or not.

```js
const truthCheckCollection = (collection, pre) =>
  collection.every(obj => obj[pre]);

truthCheckCollection(
  [
    { user: 'Tinky-Winky', sex: 'male' },
    { user: 'Dipsy', sex: 'male' },
  ],
  'sex'
); // true
```
