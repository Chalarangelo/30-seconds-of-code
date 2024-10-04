---
title: Generate a random hex color code in JavaScript
shortTitle: Random hex color code
language: javascript
tags: [math,random]
cover: industrial-tokyo
excerpt: Learn how to generate a random hexadecimal color code with a few lines of JavaScript.
listed: true
dateModified: 2024-02-02
---

Hex color codes are used everywhere in web development and, oftentimes, you might need to generate a random one on the fly. This can be useful for a variety of purposes, such as generating random colors for a UI, or for testing purposes.

Generating a random hex color code is fairly simple, but requires some math. You can use the `Math.random()` method to generate a random **24-bit** (6 * 4bits) hexadecimal number, then use **bit shifting** and convert it to an **hexadecimal string** using `Number.prototype.toString()` with a base of `16`.

As the resulting number might be longer than 6 characters, you can use `String.prototype.slice()` to extract the first **6 characters**. Finally, you can prepend a `#` to the string to make it a valid hex color code.

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // '#e34155'
```
