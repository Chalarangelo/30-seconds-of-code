---
title: containsWhitespace
tags: string,regexp,beginner
---

Checks if the given string contains any whitespace characters.

- Use `RegExp.prototype.test()` with an appropriate regular expression to check if the given string contains any whitespace characters.

```js
const containsWhitespace = str => /\s/.test(str);
```

```js
containsWhitespace('lorem'); // false
containsWhitespace('lorem ipsum'); // true
```
