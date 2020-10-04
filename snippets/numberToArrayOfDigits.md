---
title: numberToArrayOfDigits
tags: number,array,beginner
---

Convert a number to an array of digits

- Use the spread operator (`...`) and the `parseInt` function to convert a given number to an array of single digits.

```js
const converToArray = number => [...`${number}`].map(digit => parseInt(digit));
```

```js
convertToArray(12345); // [1, 2, 3, 4, 5]
convertToArray(820); // [8, 2, 0]
```
