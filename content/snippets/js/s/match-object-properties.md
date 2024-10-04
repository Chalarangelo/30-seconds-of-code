---
title: Check if two JavaScript objects have the same properties
shortTitle: Match object properties
language: javascript
tags: [object]
cover: two-flower-vases
excerpt: Compare two objects to determine if the first one contains equivalent property values to the second one.
listed: true
dateModified: 2024-03-24
---

Given two JavaScript objects, it's not straightforward to compare them for equality. This is because objects are reference types, and two objects with the same properties and values are not considered equal. However, it's not difficult to implement a function that does just that.

## One-sided comparison

First off, let's create a function that compares two objects to determine if **the first one contains equivalent property values to the second one**. This essentially means checking if the keys of the first object are a **superset** of the keys of the second object, and if the values of the first object are equal to the values of the second object.

Comparing objects this way requires **iterating over the keys of the second object**, using `Object.keys()`, and checking if each key exists in the first object using `Array.prototype.every()`, `Object.prototype.hasOwnProperty()`.

### Comparison by value

In order to compare the values of the properties, we can simply use the strict equality operator (`===`). This will ensure that the values are not only equal but also of the same type.

```js
const matches = (obj, source) =>
  Object.keys(source).every(
    key => obj.hasOwnProperty(key) && obj[key] === source[key]
  );

matches(
  { age: 25, hair: 'long', beard: true },
  { hair: 'long', beard: true }
); // true

matches(
  { hair: 'long', beard: true },
  { age: 25, hair: 'long', beard: true }
); // false
```

### Comparison using a custom function

If, instead, we want to use a **custom function to determine value equality**, we can simply replace the strict equality operator with the provided function. This function will receive the value of the property in both objects, as well as the key and the objects themselves.

```js
const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) &&
      fn(obj[key], source[key], key, obj, source)
  );

const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (a, b) => isGreeting(a) && isGreeting(b)
); // true
```

## Two-sided comparison

If you want to compare two objects in **both directions**, you can create a `Set` of the keys of both objects and check if the **size of the set** is equal to the number of keys in each object. Then, you can use the same approach as before, except iterating over the keys of the set and checking if **each key exists in both objects**.

### Comparison by value

For simple value comparison, you can again use the strict equality operator (`===`).

```js
const matchesSymmetric = (a, b) => {
  const keysA = Object.keys(a),
    keysB = Object.keys(b);
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  if (keys.size !== keysA.length || keys.size !== keysB.length) return false;

  return [...keys].every(
    key => a.hasOwnProperty(key) && b.hasOwnProperty(key) && a[key] === b[key]
  );
};

matchesSymmetric(
  { age: 25, hair: 'long', beard: true },
  { hair: 'long', beard: true }
); // false

matchesSymmetric(
  { hair: 'long', beard: true },
  { age: 25, hair: 'long', beard: true }
); // false

matchesSymmetric(
  { age: 25, hair: 'long', beard: true },
  { age: 25, hair: 'long', beard: true }
); // true

```

### Comparison using a custom function

For custom value comparison, you can use the same approach as before, using a custom function to determine value equality.

```js
const matchesSymmetricWith = (a, b, fn) => {
  const keysA = Object.keys(a),
    keysB = Object.keys(b);
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  if (keys.size !== keysA.length || keys.size !== keysB.length) return false;

  return [...keys].every(
    key =>
      a.hasOwnProperty(key) &&
      b.hasOwnProperty(key) &&
      fn(a[key], b[key], key, a, b)
  );
};

const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesSymmetricWith(
  { greeting: 'hello', other: 2 },
  { greeting: 'hi' },
  (a, b) => isGreeting(a) && isGreeting(b)
); // false

matchesSymmetricWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (a, b) => isGreeting(a) && isGreeting(b)
); // true
```
