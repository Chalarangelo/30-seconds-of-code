---
title: String is uppercase
type: snippet
language: javascript
tags: [string]
cover: flower-portrait-7
dateModified: 2020-09-15
---

Checks if a string is upper case.

- Convert the given string to upper case, using `String.prototype.toUpperCase()` and compare it to the original.

```js
const isUpperCase = str => str === str.toUpperCase();
```

```js
isUpperCase('ABC'); // true
isUpperCase('A3@$'); // true
isUpperCase('aB4'); // false
```
