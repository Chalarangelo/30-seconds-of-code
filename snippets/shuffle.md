---
title: Shuffle array
tags: array,random,algorithm
cover: interior-11
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2021-02-20T21:17:38+02:00
---

Randomizes the order of the values of an array, returning a new array.

- Use the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method) to reorder the elements of the array.

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
```

```js
const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
```
