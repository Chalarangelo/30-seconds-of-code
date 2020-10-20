---
title: isAlphaNumeric
tags: string,regexp,beginner
---

Checks if a string contains only alphanumeric characters.

- Use `RegExp.prototype.test()` to check if the input string matches against the alphanumeric regexp pattern.

```js
const isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);
```

```js
isAlphaNumeric('hello123'); // true
isAlphaNumeric('123'); // true
isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
isAlphaNumeric('#$hello'); // false
```
