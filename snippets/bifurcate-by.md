---
title: Bifurcate array based on function
tags: array
cover: canoe
firstSeen: 2018-02-14T12:13:07+02:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Splits values into two groups, based on the result of the given filtering function.

- Use `Array.prototype.reduce()` and `Array.prototype.push()` to add elements to groups, based on the value returned by `fn` for each element.
- If `fn` returns a truthy value for any element, add it to the first group, otherwise add it to the second group.

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [
    [],
    [],
  ]);
```

```js
bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```
