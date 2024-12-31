---
title: How can I check if an array is a superset of another array in JavaScript?
shortTitle: Superset
language: javascript
tags: [array]
cover: waves-from-above-2
excerpt: Check if an iterable is a superset of another one, excluding duplicate values.
listed: true
dateModified: 2024-01-01
---

A **superset** is a set that contains all the elements of another set, and possibly more. Knowing how to check if an array is a superset of another array might come in handy from time to time.

As the mathematical definition refers to a set, **duplicates are not considered**. This is why using a `Set` object is a good idea. Combining it with `Array.prototype.every()` and `Set.prototype.has()` is all that's needed to perform the check.

Checking for a **subset** is as simple as reversing the order of the arguments. Note that you can use this function for **any type of iterable**, not just arrays.

```js
const superset = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sB].every(v => sA.has(v));
};

const subset = (a, b) => superset(b, a);

superset([1, 2, 3, 4], [1, 2, 2]); // true
superset([1, 2, 3, 4], [1, 3, 5]); // false

subset(new Set([1, 2]), new Set([1, 2, 3, 4])); // true
subset(new Set([1, 5]), new Set([1, 2, 3, 4])); // false
```

> [!NOTE]
>
> Future versions of ECMAScript may include a `Set.prototype.isSupersetOf()` and `Set.prototype.isSubsetOf()`, which will make this code snippet obsolete.
