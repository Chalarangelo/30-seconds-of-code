---
title: Bifurcate array based on values
type: snippet
language: javascript
tags: [array]
cover: sunrise-over-mountains
dateModified: 2020-11-01
---

Splits values into two groups, based on the result of the given `filter` array.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on `filter`.
- If `filter` has a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);
```

```js
bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```
