---
title: romanToInteger
tags: string,object,intermediate
---

It Converts Roman Numerals into Integers. Accepts Roman Numeral Strings from 'I' to 'MMMCMXCIX'

- Values is an object of all distinct charactes in Roman Numerals with their respective Integer value mapping.
- Iterate over string character by charater.
- Lookup for the respective values in the reference Numberal to Integer mapping object. Add the respective Integer to the total. Repeat Until all the String Characters are not processed.

```js
const romanToInteger = (str) => {
  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  let i = 0;

  while (i < str.length) {
    s1 = values[str[i]];
    if (i + 1 < str.length) {
      s2 = values[str[i + 1]];
      if (s1 >= s2) {
        total = total + s1;
        i = i + 1;
      } else {
        total = total - s1;
        i = i + 1;
      }
    } else {
      total = total + s1;
      i = i + 1;
    }
  }
  return total;
};
```

```js
romanToInteger("MMMCMXCIX"); // 3999
romanToInteger("IX"); // 9
romanToInteger("MIV"); // 1004
```
