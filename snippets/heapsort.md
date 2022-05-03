---
title: Heap sort
tags: algorithm,array,recursion
expertise: advanced
author: chalarangelo
cover: blog_images/building-blocks.jpg
firstSeen: 2020-12-28T22:48:09+02:00
lastUpdated: 2020-12-28T22:48:09+02:00
---

Sorts an array of numbers, using the heapsort algorithm.

- Use recursion.
- Use the spread operator (`...`) to clone the original array, `arr`.
- Use closures to declare a variable, `l`, and a function `heapify`.
- Use a `for` loop and `Math.floor()` in combination with `heapify` to create a max heap from the array.
- Use a `for` loop to repeatedly narrow down the considered range, using `heapify` and swapping values as necessary in order to sort the cloned array.

```js
const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};
```

```js
heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]
```
