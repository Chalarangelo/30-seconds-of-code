---
title: randomCapitalize
tags: array,intermediate
firstSeen: 2014-22-01T02:03:37+06:00
lastUpdated: 2020-17-01T02:11:04+06:00
---

Randomly capitalize letters of a string.

- Use `String.prototype.split()` to convert string into an array of letters.
- Use `Math.random()` to randomly select letters of a string.
- Selected letters will be capitalized with `String.prototype.toUpperCase()`.

```js
const randomCapitalize = str =>
  let letters = str.split("");
  let n = 0;
  while (n < letters.length){
    if (Math.floor(Math.random()*2) == 1){
      letters[n] = letters[n].toUpperCase();
    }
    n = n+1;
  }
  return letters.join("");
```

```js
randomCapitalize('hello world'); // 'hEllO WoRLd'
```
