---
title: String is lowercase
type: snippet
tags: [string]
cover: flower-portrait-7
dateModified: 2020-10-20T11:21:07+03:00
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
