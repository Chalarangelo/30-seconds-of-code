---
title: Check if string contains whitespace
type: snippet
language: javascript
tags: [string,regexp]
cover: bag-waiting
dateModified: 2020-10-18
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
