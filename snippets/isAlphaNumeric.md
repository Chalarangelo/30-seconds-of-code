---
title: isAlphaNumeric
tags: string,regexp,intermediate
---

Checks if a string contains only alphanumeric characters.

Use `String.prototype.match()` to check if input string matches against alphanumeric regex pattern.

```js
const isAlphaNumeric = (str) => !!str.match(/^[a-z0-9]+$/gi);
```

```js
isAlphaNumeric('hello123'); // true
isAlphaNumeric('123'); // true
isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
isAlphaNumeric('#$hello'); // false
```
