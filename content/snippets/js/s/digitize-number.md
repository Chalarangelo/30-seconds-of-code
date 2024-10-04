---
title: Digitize a number in JavaScript
shortTitle: Digitize number
language: javascript
tags: [math]
cover: industrial-tokyo
excerpt: Learn how to convert a number to an array of digits, removing its sign if necessary.
listed: true
dateModified: 2024-08-15
---

Converting a number to an **array of digits** is fairly easy in JavaScript. All it requires is some string manipulation and array methods.

For starters, any number can be converted to a string using the **template literal syntax**. Converting a string to an **array of characters** is as simple as using the spread operator (`...`). Then, to convert a character into a number, you can use `Number.parseInt()`. Finally, to combine these two steps, you can use `Array.prototype.map()` to transform each character into a number.

As an additional step, we can use `Math.abs()` to **remove the sign of the number** before converting it to a string. This way, we can handle both positive and negative numbers.

```js
const digitize = n => [...`${Math.abs(n)}`].map(i => Number.parseInt(i, 10));

digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]
```
