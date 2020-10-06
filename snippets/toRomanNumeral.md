---
title: toRomanNumeral
tags: math,string,intermediate
---

Converts an integer to its roman numeral representation.
Accepts value between `1` and `3999` (both inclusive).

- Create a lookup table containing 2-value arrays in the form of (roman value, integer).
- Use `Array.prototype.reduce()` to loop over the values in `lookup` and repeatedly divide `num` by the value, using `String.prototype.repeat()` to add the roman numeral representation to the accumulator.

```js
const toRomanNumeral = num => {
  const lookup = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];
  return lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v));
    num = num % v;
    return acc;
  }, '');
};

```

```js
toRomanNumeral(3); // 'III'
toRomanNumeral(11); // 'XI'
toRomanNumeral(1998); // 'MCMXCVIII'
```
