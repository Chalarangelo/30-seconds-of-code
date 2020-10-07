---
title: randomItemFromArray
tags: array,intermediate
---

Selects a random item from an array.

- Use `Math.floor()` to round down a `Math.random()` times the array's length as an index. 


```js
const randomItemFromArray = array =>
  array[Math.floor(Math.random()*array.length)];
```

```js
randomItemFromArray(["apples", "bananas", "oranges", "pomegranites", "potatos"]); // 'potatos'
```
