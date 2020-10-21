---
title: randomItem
tags: array,random
---

Return random item from an array.

- `Math.floor()` returns the largest integer less than or equal to a given number.
- `Math.random()` generate a random floating-point number.
- `array.lenght()` returns size/length of an given array.

```js
const randomItem = array => {
    return array[Math.floor(Math.random()*array.length)];
  }
```

```js
let myArray = ['Thor','Ironman','Thanos','Loki','Spiderman'];
randomItem(myArray); // 'Loki'
```
