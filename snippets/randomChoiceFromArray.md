---
title: randomChoiceFromArray
tags: random,array,intermediate
---

Returns an array of `n` randomly selected elements from a parent array.

- Creates an array from a specified length.
- The array is then mapped with random values.
- The function takes a default argument, `amount`. When omitted, it defaults to 1.

```js
const randomChoiceFromArray = (arr, amt = 1) =>
  Array.from(new Array(amt), () => arr[Math.floor(Math.random() * arr.length)]);
```

```js
randomChoiceFromArray([1, 2, 3]); // [1]
randomChoiceFromArray([1, 2, 3], 2); // [1, 3]
```
