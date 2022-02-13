---
title: Reject non-matching values
tags: array,beginner
firstSeen: 2018-04-27T03:17:15+03:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Filters an array's values based on a predicate function, returning only values for which the predicate function returns `false`.

- Use `Array.prototype.filter()` in combination with the predicate function, `pred`, to return only the values for which it returns `false`.

```js
const reject = (pred, array) => array.filter((...args) => !pred(...args));
```

```js
reject(x => x % 2 === 0, [1, 2, 3, 4, 5]); // [1, 3, 5]
reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana']);
// ['Pear', 'Kiwi']
```
