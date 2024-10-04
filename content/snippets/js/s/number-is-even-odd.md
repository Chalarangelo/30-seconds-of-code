---
title: How can I check if a number is even or odd using JavaScript?
shortTitle: Check if a number is even or odd
language: javascript
tags: [math]
cover: by-the-lighthouse
excerpt: Check if a number is even or odd using JavaScript using the modulo operator or bitwise AND operator.
listed: true
dateModified: 2023-10-06
---

## Using the modulo operator

The **modulo operator** (`%`) returns the **remainder of a division operation**. Given that, we can check if a number is even or odd by dividing it by `2` and checking the remainder. If the remainder is `0`, the number is even, otherwise it's odd.

```js
const isEven = num => num % 2 === 0;
const isOdd = num => num % 2 === 1;

isEven(3); // false
isOdd(3); // true
```

## Using the bitwise AND operator

The **bitwise AND operator** (`&`) returns `1` if both bits are `1`, otherwise it returns `0`. The binary representation of an even number always ends with `0`, while the binary representation of an odd number always ends with `1`. As such, applying the bitwise AND operator to a number and `1` will return `0` for even numbers and `1` for odd numbers. In order to convert this result to a boolean, we can use the `Boolean()` function.

```js
const isEven = num => !Boolean(num & 1);
const isOdd = num => Boolean(num & 1);

isEven(3); // false
isOdd(3); // true
```

### Notes

- While both approaches work, the modulo operator is more readable and should be preferred.
- Apart from these two approaches, other bitwise operators, such as the bitwise XOR operator (`^`), can also be used to check if a number is even or odd.
