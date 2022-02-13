---
title: Reverse string
tags: string,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-18T14:58:09+03:00
---

Reverses a string.

- Use the spread operator (`...`) and `Array.prototype.reverse()` to reverse the order of the characters in the string.
- Combine characters to get a string using `String.prototype.join()`.

```js
const reverseString = str => [...str].reverse().join('');
```

```js
reverseString('foobar'); // 'raboof'
```
