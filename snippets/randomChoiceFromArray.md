---
title: randomChoiceFromArray
tags: random,array,intermediate
---

Returns an array of n randomly selected elements from a parent array.

- Creates an array from a specified length.
- The array is then mapped with random values.

```js
const randomChoiceFromArray = (array, amount = 1) => {
  return Array.from(new Array(~~amount < 1 ? 1 : ~~amount), () => array[Math.floor(Math.random() * array.length)]);
};
```

```js
randomChoiceFromArray([1, 2, 3]); // [1]
randomChoiceFromArray([1, 2, 3], 2); // [1, 3]
```
