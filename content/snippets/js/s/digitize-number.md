---
title: Digitize a number in JavaScript
shortTitle: Digitize number
language: javascript
tags: [number]
cover: industrial-tokyo
excerpt: Learn how to convert any number to an array of digits, as well as how to sum the digits and compute the digital root efficiently.
listed: true
dateModified: 2025-06-15
---

Converting a number to an **array of digits** is fairly easy in JavaScript. All it requires is some string manipulation and array methods.

## Digitize a number

For starters, any number can be converted to a string using the **template literal syntax**. Converting a string to an **array of characters** is as simple as using the spread operator (`...`). Then, to convert a character into a number, you can use `Number.parseInt()`. Finally, to combine these two steps, you can use `Array.prototype.map()` to transform each character into a number.

As an additional step, we can use `Math.abs()` to **remove the sign of the number** before converting it to a string. This way, we can handle both positive and negative numbers.

```js
const digitize = n =>
  [...`${Math.abs(n)}`].map(i => Number.parseInt(i, 10));

digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]
```

## Sum of digits

If you want to **sum the digits** of a number, you can use `Array.prototype.reduce()` on the array of digits. This will allow you to accumulate the sum of all digits in a single pass.

```js
const sumDigits = n =>
  digitize(n).reduce((acc, curr) => acc + curr, 0);

sumDigits(123); // 6
sumDigits(-123); // 6
```

## Digital root

The **digital root** of a number is the single-digit value obtained by an iterative process of summing digits, until a single-digit number is achieved. You can compute the digital root using the `sumDigits` function in a loop until the result is a single digit.

```js
const digitalRoot = n => {
  let sum = sumDigits(n);
  while (sum > 9) sum = sumDigits(sum);
  return sum;
};

digitalRoot(123); // 6
digitalRoot(-123); // 6
```

However, a **more efficient** way to compute the digital root is to use the modulo (`%`) operator in conjuction with the number `9`. The digital root can be derived from the properties of numbers in base 10, where the digital root is equivalent to the **number modulo 9**. This method is particularly useful because it avoids the need for iterative summation.

```js
const digitalRoot = n => {
  if (n === 0) return 0;
  if (n % 9 != 0) return n % 9;
  return 9;
};

digitalRoot(123); // 6
digitalRoot(-123); // 6
```

Finally, another similarly efficient way to compute the digital root is to use the **formula** `1 + (n - 1) % 9`, which works for all integers except zero.

```js
const digitalRoot = n =>
  n === 0 ? 0 : 1 + (Math.abs(n) - 1) % 9;

digitalRoot(123); // 6
digitalRoot(-123); // 6
```
