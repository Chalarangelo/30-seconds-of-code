---
title: How do I compare two objects in JavaScript?
shortTitle: Object comparison
type: question
tags: javascript,object,comparison
author: chalarangelo
cover: blog_images/blue-lake.jpg
excerpt: Learn how you can compare two objects in JavaScript using various different techniques.
firstSeen: 2021-09-26T05:00:00-04:00
---

### Equality comparison

Even though two different objects can have the same properties with equal values, they are not considered equal when compared using either the loose or strict equality operators (`==` or `===`). This is because arrays and objects in JavaScript are compared by reference. This is unlike primitive values which are compared by value.

```js
const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

a === b; // false
```

### JSON.stringify

`JSON.stringify()` often comes up as the solution to this problem. While it can be useful in some situations, comparing the serialized strings can have its own pitfalls. The most common of these has to do with similar, but not equal, values that result in the same serialized string.

```js
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

equals(a, b); // true

const c = { name: 'John' };
const d = { name: 'John', age: undefined };

equals(c, d); // true, should be false
```

### Deep equality comparison

As it turns out, comparing two objects is not trivial. This is the reason why shallow or deep equality comparison helper functions are so common. These usually use recursion to deeply compare two objects, accounting for most scenarios such as empty values, special types and nesting.

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
```

The above helper function handles all of these issues and is explained in more depth in the [equals snippet](/js/s/equals).
