---
title: Convert between binary and decimal numbers in JavaScript
shortTitle: Binary number conversion
language: javascript
tags: [number]
cover: interior-18
excerpt: Binary numbers are a fundamental part of computer science. Learn how to convert between binary and decimal numbers in JavaScript.
listed: true
dateModified: 2025-07-07
---

I don't often work with **binary numbers**, but whenever I do, I find myself looking up certain pieces of information over and over again. This is especially true when I need to convert a binary string to a decimal number or vice versa. Let's take a look at how to do this in JavaScript.

## Binary to decimal

Given a **binary string**, you can use `Number.parseInt()` with a base of `2` to indicate the string is in binary format and convert it to its **decimal** equivalent.

```js
const binaryToDecimal = binary => Number.parseInt(binary, 2);

binaryToDecimal('10');  // 2
binaryToDecimal('110'); // 6
```

You may also use the `BigInt` constructor to convert a binary string to a `BigInt`. This is useful when dealing with **very large numbers** that exceed the range of regular integers.

```js
const binaryToBigInt = binary => BigInt(`0b${binary}`);

binaryToBigInt('10');   // 2n
binaryToBigInt('110');  // 6n
```

> [!TIP]
>
> Notice the **`0b` prefix** in the string passed to `BigInt`? This prefix indicates that the string is a binary number. In fact, you can use this in your code when writing out a numeric value in binary, like this:
>
> ```js
> const binaryNumber = 0b10;        // 2 (Number)
> const bigIntBinaryNumber = 0b10n; // 2n (BigInt)
> ```

## Decimal to binary

To convert a **decimal number** to a binary string, use `Number.prototype.toString()` with a base of `2`. This returns the binary representation of the number as a string.

```js
const decimalToBinary = decimal => decimal.toString(2);

decimalToBinary(2); // '10'
decimalToBinary(6); // '110'
```

Luckily, `BigInt.prototype.toString()` works the same way, so you can create a similar function, or even reuse the same one, for `BigInt` values.

```js
const bigIntToBinary = bigInt => bigInt.toString(2);

bigIntToBinary(2n); // '10'
bigIntToBinary(6n); // '110'
```
