---
title: Reversed unique values in array based on function
type: snippet
language: javascript
tags: [array]
cover: beach-from-above
dateModified: 2021-10-13
---

Finds all unique values of an array, based on a provided comparator function, starting from the right.

- Use `Array.prototype.reduceRight()` and `Array.prototype.some()` to create an array containing only the last unique occurrence of each value, based on the comparator function, `fn`.
- The comparator function takes two arguments: the values of the two elements being compared.

```js
const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
```

```js
uniqueElementsByRight(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]
```
