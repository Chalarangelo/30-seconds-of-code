---
title: Implementing the Luhn Algorithm in JavaScript
shortTitle: Luhn algorithm
language: javascript
tags: [math,algorithm]
cover: blank-card
excerpt: Implement the Luhn Algorithm, used to validate a variety of identification numbers.
listed: true
dateModified: 2024-02-22
---

The [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) is a simple **checksum formula**, used to **validate a variety of identification numbers**, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.

In order to implement it in JavaScript, you can start by splitting the number into an **array of digits**, using `String.prototype.split()`. Use `Array.prototype.reverse()` to reverse it and `Array.prototype.map()` to convert each digit to a number with the help of `Number.parseInt()`.

You can then use `Array.prototype.shift()` to obtain the **last digit** of the number, and `Array.prototype.reduce()` to **implement the algorithm**. This simply means iterating over the array of digits, and for each one, you adding it to the accumulator if the index is even or doubling it and adding the result to the accumulator if the index is odd.

Finally, return `true` if the sum is divisible by `10`, and `false` otherwise.

```js
const luhnCheck = num => {
  const arr = `${num}`
    .split('')
    .reverse()
    .map(x => Number.parseInt(x));
  const lastDigit = arr.shift();
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

luhnCheck('4485275742308327'); // true
luhnCheck(6011329933655299); //  true
luhnCheck(123456789); // false
```
