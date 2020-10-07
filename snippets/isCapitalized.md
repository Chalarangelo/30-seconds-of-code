---
title: isCapitalized
tags: array,intermediate
---

This snippet checks if a string is capitalized.

- Use `split` to create an array of the characters of the string.
- Use `for` to loop over the array and capitalize it with `toUpperCase` and `toLowerCase`.
- Use `join` to transform the array into a string.
- Compare if the two strings are the same.

```js
const isCapitalized = string => {
  newString = string.split('');
  newString[0] = newString[0].toUpperCase();
  for(var i=1; i<newString.length; i++){
    newString[i] = newString[i].toLowerCase();
  };
  newString = newString.join('');
  return newString === string
};
```

```js
isCapitalized('Sampleinput'); // true
```
