---
title: countUniqueCharacters
tags: function,string,intermediate
---

Returns total number of unique characters from a given string.

Creates an `Object` which will only store unique values. And also creates a `counter` variable which will increment by one, if any new property is added to the object. In the end, returns the counter variable.

```js
const countUniqueCharacters = str => {
  if (typeof str === "string" || str instanceof String) {
    str = str.replace(/\s/g, "").toLowerCase();
    const obj = {};
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
      if (!obj[str[i]]) {
        obj[str[i]] = str[i];
        counter++;
      }
    }
    return counter;
  }
  return null;
};
```

```js
countUniqueCharacters("thisisawesome") //9
countUniqueCharacters("thequickbrownfoxjumpsoverthelazydog") //26
```
