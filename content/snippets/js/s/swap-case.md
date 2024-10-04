---
title: Swapcase a JavaScript string
shortTitle: Swapcase string
language: javascript
tags: [string]
cover: mountain-lake-2
excerpt: Learn how to create a string with uppercase characters converted to lowercase and vice versa.
listed: true
dateModified: 2024-02-10
---

A fun little exercise I've seen in many beginner coding challenges is to create a string with **uppercase characters converted to lowercase and vice versa**. This is often referred to as **swapcasing** a string. While this is a fairly easy exercise, it can be a good place to practice various JavaScript methods and techniques.

Starting with a string, we first need to convert it into an **array of characters**, using the spread operator (`...`).

We can then use `String.prototype.toLowerCase()` and the ternary operator ([`?`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)) to **determine the case of each character**. Depending on the case, we **convert it to the opposite** using `String.prototype.toUpperCase()` or `String.prototype.toLowerCase()`.

Finally, we use `Array.prototype.join()` to **combine the characters back into a string**.

```js
const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

swapCase('Hello world!'); // 'hELLO WORLD!'
```

> [!NOTE]
>
> It is not necessarily true that `swapCase(swapCase(str)) === str`. This is because the function does not take into account **special cases** and assumes that all characters in a string are either uppercase or lowercase.
