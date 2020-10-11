---
title: isIsogram
tags: string, intermediate
---

Creates a function that accepts a string parameter and output whether its an isogram or not.

- Use `String.toLowerCase()` to convert the string to lowercase letters.
- Use `String.prototype.split()`, `String.prototype.indexOf()` and `Array.prototype.every()` to split the string into substrings, run a test for all the elements in that array and finally return the index of first occurence of a specified value in a string.
- Function returns true if the string is an isogram (that is no letter is repeated) else returns false.
- Returns false is called with no parameter.

```js
const isIsogram = (str = null) => {
  if(str == null) return false;
  str = str.toLowerCase();
  return str.split("").every((c, i) => str.indexOf(c) === i);
}		
```

```js
isIsogram("Dermatoglyphics"); // true
isIsogram("aba"); // false
isIsogram("moOse"); // false
isIsogram(); // false
```
