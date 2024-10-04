---
title: Convert an integer to a roman numeral in JavaScript
shortTitle: Integer to roman numeral
language: javascript
tags: [math,string]
cover: ancient-greek-building
excerpt: Roman numerals are often used for stylistic reasons, but converting an integer to a roman numeral can be a bit tricky.
listed: true
dateModified: 2024-03-12
---

Roman numerals originated in ancient Rome and were used for many centuries. They are still used today in some contexts, mainly for stylistic reasons.

In order to convert an integer to a roman numeral, we can use a **lookup table** containing roman numeral values and their integer counterparts. We can then use a simple algorithm to **repeatedly divide the input number** by the values in the lookup table and add the corresponding roman numeral to the result.

Having the lookup table, we can use `Array.prototype.reduce()` to loop over the values and repeatedly divide `num` by the value. We can then use `String.prototype.repeat()` to add the roman numeral representation to the result.

```js
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

const toRomanNumeral = num =>
  lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v));
    num = num % v;
    return acc;
  }, '');

toRomanNumeral(3); // 'III'
toRomanNumeral(11); // 'XI'
toRomanNumeral(1998); // 'MCMXCVIII'
```

> [!NOTE]
>
> This code snippet only handles numbers between `1` and `3999` (both inclusive). This is because the largest number that can be represented using standard roman numerals is `3999`, which is represented as `MMMCMXCIX`.
