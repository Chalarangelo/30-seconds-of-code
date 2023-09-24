---
title: Reverse string
type: snippet
language: javascript
tags: [string]
cover: type-stamps
dateModified: 2020-10-18
---

Reverses a string.

- Use the spread operator (`...`) and `Array.prototype.reverse()` to reverse the order of the characters in the string.
- Combine characters to get a string using `Array.prototype.join()`.

```js
const reverseString = str => [...str].reverse().join('');
```

```js
reverseString('foobar'); // 'raboof'
```
