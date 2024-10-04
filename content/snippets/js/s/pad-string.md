---
title: Pad a string with a character
shortTitle: Pad string
language: javascript
tags: [string]
cover: bridge-over-road
excerpt: Pad a string on both sides with the specified character, if it's shorter than the specified length.
listed: true
dateModified: 2024-08-14
---

Oftentimes, when working with string, especially when printing to the console, you want to **pad a string** with a specific character to make it a certain length. This can be useful when you want to align text in a table or when you want to make sure that all strings have the same length.

While JavaScript's `String.prototype.padStart()` and `String.prototype.padEnd()` built-in methods can be used to pad a string **on one side** and **up to a certain length**, you will need to combine them to pad both sides of a string. This is fairly simple, as you only need to calculate the **number of characters to pad on each side**.

```js
const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);

pad('cat', 8); // '  cat   '
pad(String(42), 6, '0'); // '004200'
pad('foobar', 3); // 'foobar'
```
