---
title: N random elements in array
type: snippet
language: javascript
tags: [array,random]
cover: peaches
dateModified: 2020-10-22
---

Gets `n` random elements at unique keys from an array up to the size of the array.

- Shuffle the array using the [Fisher-Yates algorithm](https://github.com/30-seconds/30-seconds-of-code#shuffle).
- Use `Array.prototype.slice()` to get the first `n` elements.
- Omit the second argument, `n`, to get only one element at random from the array.

```js
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};
```

```js
sampleSize([1, 2, 3], 2); // [3, 1]
sampleSize([1, 2, 3], 4); // [2, 3, 1]
```
