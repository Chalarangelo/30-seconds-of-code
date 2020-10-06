---
title: intToRoman
tags: integer,roman
---

### Convert Integer to Roman Number

Following snippet is useful for converting integer number into roman number.

***Note:-*** This code is only useful for number between 1 and 3999.
according to Wikipedia the largest number you can represent in Roman is 3999. [click here](https://en.wikipedia.org/wiki/Roman_numerals)

```js
function intToRoman(num) {
  const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let roman = '';
  for (let i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
```

```js
intToRoman(11); // XI
intToRoman(03); // III
intToRoman(1998) // MCMXCVIII
```
