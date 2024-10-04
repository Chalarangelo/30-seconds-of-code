---
title: Apply a mapping function to each character in a JavaScript string
shortTitle: Map string
language: javascript
tags: [string]
cover: budapest-palace
excerpt: Learn how to replicate the behavior of `Array.prototype.map()` for strings.
listed: true
dateModified: 2024-02-27
---

Ever wished `Array.prototype.map()` worked on strings? Well, it doesn't, but you can easily replicate its behavior. As strings can easily be turned into arrays and back, you only need to take care of the mapping function and the arguments it receives.

When working with arrays, the mapping function expects three arguments - the current element, the index of the current element and the array itself. When working with strings, the mapping function should expect the current character, the index of the current character and the string itself. This, in fact, is the only part that requires special attention.

For the rest of the process, you can simply use `String.prototype.split()` to **turn the string into an array**. Then, use `Array.prototype.map()` to **apply the mapping function to each character**, taking extra care to pass the correct arguments. Finally, use `Array.prototype.join()` to **turn the array back into a string**.

```js
const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

mapString('lorem ipsum', c => c === ' ' ?  ' ' : c + c.toUpperCase() + c);
// 'lLloOorRreEemMm iIipPpsSsuUumMm'
```
