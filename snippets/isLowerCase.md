---
title: String is lowercase
tags: string,beginner
firstSeen: 2018-01-06T11:16:05+02:00
lastUpdated: 2020-10-20T11:21:07+03:00
---

Checks if a string is lower case.

- Convert the given string to lower case, using `String.prototype.toLowerCase()` and compare it to the original.

```js
const isLowerCase = str => str === str.toLowerCase();
```

```js
isLowerCase('abc'); // true
isLowerCase('a3@$'); // true
isLowerCase('Ab4'); // false
```
