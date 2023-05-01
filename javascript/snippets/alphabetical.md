---
title: Sort array alphabetically
type: snippet
tags: [array]
author: chalarangelo
cover: boutique-home-office-1
dateModified: 2023-02-15T05:00:00-04:00
---

Sorts an array of objects alphabetically based on a given property.

- Use `Array.prototype.sort()` to sort the array based on the given property.
- Use `String.prototype.localeCompare()` to compare the values for the given property.

```js
const alphabetical = (arr, getter, order = 'asc') =>
  arr.sort(
    order === 'desc'
      ? (a, b) => getter(b).localeCompare(getter(a))
      : (a, b) => getter(a).localeCompare(getter(b))
  );
```

```js
const people = [ { name: 'John' }, { name: 'Adam' }, { name: 'Mary' } ];
alphabetical(people, g => g.name);
// [ { name: 'Adam' }, { name: 'John' }, { name: 'Mary' } ]
alphabetical(people, g => g.name, 'desc');
// [ { name: 'Mary' }, { name: 'John' }, { name: 'Adam' } ]
```
