---
title: String is alpha
type: snippet
language: javascript
tags: [string,regexp]
cover: coffee-phone-tray-3
dateModified: 2020-12-31
---

Checks if a string contains only alpha characters.

- Use `RegExp.prototype.test()` to check if the given string matches against the alphabetic regexp pattern.

```js
const isAlpha = str => /^[a-zA-Z]*$/.test(str);
```

```js
isAlpha('sampleInput'); // true
isAlpha('this Will fail'); // false
isAlpha('123'); // false
```
