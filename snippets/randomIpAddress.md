---
title: randomIp
tags: math,random,beginner
---

Generated a random Ip Address.

- Use `Array()` with a given `length` to create a new array with empty elements.
- Use `Array.prototype.fill()` with `value` to fill the empty array with the value.
- Use `Array.prototype.map()` to map each element with `Math.random()` to genrate a random number up to 255 and `Math.floor()` to round the number the largest integer below it.
- Use `Array.prototype.join(delimeter)` to join the mapped array to a string joined by the delimeter `.`

```js
const randomIp = () => {
  return Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join('.');
};
```

```js
randomIp(); // '82.137.171.182'
```
