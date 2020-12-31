---
title: isAlpha
tags: string,regexp,beginner
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
