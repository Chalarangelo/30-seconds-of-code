---
title: containsWhitespace
tags: string,regexp,beginner
firstSeen: 2020-03-25T12:37:13+02:00
lastUpdated: 2020-10-18T23:04:45+03:00
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
