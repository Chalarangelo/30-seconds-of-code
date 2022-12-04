---
title: Random hex color code
tags: math,random
cover: blog_images/feathers.jpg
firstSeen: 2017-12-24T14:39:21+02:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Generates a random hexadecimal color code.

- Use `Math.random()` to generate a random 24-bit (6 * 4bits) hexadecimal number.
- Use bit shifting and then convert it to an hexadecimal string using `Number.prototype.toString()`.

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
```

```js
randomHexColorCode(); // '#e34155'
```
