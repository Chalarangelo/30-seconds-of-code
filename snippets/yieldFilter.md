---
title: yieldFilter
tags: array,intermediate
---

Yields the specified amount of items matching the predicate.

- Iterate over the specified range and test every item with the predicate.
- Uses `yield` to return a matching item. Read more on [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
- Handles huge data with ease.
  - does not create new arrays like `Array#filter` would.
  - only iterates once and only as far as necessary (to match the `limit`).


```js
function* yieldFilter(arr, predicate, limit = arr.length, start = 0) {
    let count = 0, i = start;
    while (count < limit && i < arr.length) {
        if (predicate(arr[i])) {
            yield arr[i];
            count++;
        }
        i++;
    }
};
```

```js
const data = Array(1000000).fill(0).map((_, i) => i); // huge array
const output = [...yieldFilter(data, n => n % 2, 5, 100000)]; // first 5 odd numbers after 100000
// [100001, 100003, 100005, 100007, 100009] in 0.09 ms
```
