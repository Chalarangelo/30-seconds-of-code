---
title: How can I extend a 3-digit color code to a 6-digit color code in JavaScript?
shortTitle: Extend 3-digit color code
language: javascript
tags: [string]
cover: laptop-plants
excerpt: Learn how to convert a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
listed: true
dateModified: 2024-02-03
---

A 3-digit color code is a **shorthand** for a 6-digit color code, where each digit is repeated to form the full 6-digit code. For example, `#03f` is equivalent to `#0033ff`.

These shorthand codes are quite common, but they pose some challenges when working with them programmatically. Thus, it's often necessary to convert them to the full **6-digit form**.

All you have to do is to **repeat each digit** of the 3-digit code to form the 6-digit code. This can be done using a combination of `Array.prototype.map()`, `String.prototype.split()` and `Array.prototype.join()` to join the mapped array.

In order to account for the possibility of the input string starting with `#`, you can use `Array.prototype.slice()` to remove the `#` from the start of the string, if it's present.

```js
const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');

extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```
