---
title: randomHexColorCode
tags: math,random,beginner
---

Generates a random hexadecimal color code.

- Use `Math.rando()m` to generate a random 24-bit (6 * 4bits) hexadecimal number.
- Use bit shifting and then convert it to an hexadecimal string using `Number.prototype.toString(16)`.

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
```

```js
randomHexColorCode(); // '#e34155'
```
