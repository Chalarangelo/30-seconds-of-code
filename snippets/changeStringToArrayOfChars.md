---
title: changeStringToArrayOfChars
tags: array,intermediate
---

Function takes string as a parameter and returns an array of characters.

- Array.prototype.split() divides a given string to separate characters
- In this case `split()` takes in an empty string as an argument `str.split('')`
- Separator can be a string or a regural expression

```js
const changeStringToArrayOfChars = text => {
    return text.split('');
  }
```

```js
changeStringToArrayOfChars('jsisawesome'); // ["j", "s", "i", "s", "a", "w", "e", "s", "o", "m", "e"]
```
