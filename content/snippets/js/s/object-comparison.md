---
title: How do I compare two objects in JavaScript?
shortTitle: Object comparison
language: javascript
tags: [object,comparison,recursion]
cover: blue-lake
excerpt: Learn how you can compare two objects in JavaScript using various different techniques.
listed: true
dateModified: 2024-07-10
---

## Equality comparison

Even though two different objects can have the **same properties with equal values**, they are not considered equal when compared using either the loose or strict equality operators (`==` or `===`). This is because arrays and objects in JavaScript are **compared by reference**. This is unlike primitive values which are compared by value.

```js
const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

a === b; // false
```

## JSON.stringify

`JSON.stringify()` often comes up as the solution to this problem. While it can be useful in some situations, comparing the serialized strings can have its own **pitfalls**. The most common of these has to do with similar, but not equal, values that result in the same serialized string.

```js
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

equals(a, b); // true

const c = { name: 'John' };
const d = { name: 'John', age: undefined };

equals(c, d); // true, should be false
```

## Deep equality comparison

As it turns out, comparing two objects is not trivial. This is the reason why shallow or **deep equality comparison** helper functions are so common. These usually use recursion to deeply compare two objects, accounting for most scenarios such as empty values, special types and nesting.

In order to implement such a function, we need to account for various scenarios. Using **recursion**, we will then compare the values of the two objects at each level of nesting.

Firstly, we check if the two values are **identical**. This will account for primitive values and references to the same object. Then, we take care of the case where both values are `Date` objects. We compare their time values using `Date.prototype.getTime()`.

After that, we can check if both values are **non-object values with an equivalent value**. This is done using strict comparison. If only one value is `null` or `undefined`, or if their prototypes differ, we return `false`.

If none of the above conditions are met, we use `Object.keys()` to check if both values have the **same number of keys**. We then use `Array.prototype.every()` to check if every key in `a` exists in `b` and if they are **equivalent** by calling `equals()` recursively.

```js
const equals = (a, b) => {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;

  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  return keys.every(k => equals(a[k], b[k]));
};

const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

equals(a, b); // true

const c = { name: 'John' };
const d = { name: 'John', age: undefined };

equals(c, d); // false

const e = [1, 2, 3];
const f = { 0: 1, 1: 2, 2: 3 };

equals(e, f); // true
```
