---
title: Sort characters in string
tags: string
cover: blog_images/purple-flower-field.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Alphabetically sorts the characters in a string.

- Use the spread operator (`...`), `Array.prototype.sort()` and  `String.prototype.localeCompare()` to sort the characters in `str`.
- Recombine using `Array.prototype.join()`.

```js
const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');
```

```js
sortCharactersInString('cabbage'); // 'aabbceg'
```
