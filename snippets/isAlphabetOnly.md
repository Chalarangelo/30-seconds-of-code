---
title: isAlphabetOnly
tags: string,regexp,beginner
---

Checks if a string contains only alphabetic characters.
- Use `RegExp.prototype.test()` to check if the input string matches against the alphabetic regexp pattern.


```js
const isAlphabetOnly = input => /^[a-zA-Z]*$/.test(input)
```

```js
isAlphabetOnly('sampleInput'); // true
isAlphabetOnly('this Will fail'); // false
isAlphabetOnly('123'); // false
```
