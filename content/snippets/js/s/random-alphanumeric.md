---
title: Generate a random alphanumeric JavaScript string
shortTitle: Random alphanumeric
language: javascript
tags: [string,random]
cover: gold-typewriter
excerpt: Use JavaScript to generate a random alphanumeric string of a specified length.
listed: true
dateModified: 2024-03-15
---

While generating a [random arithmetic](/js/s/random-number-or-integer-in-range) or [boolean value](/js/s/random-boolean) is fairly easy in JavaScript, generating a random alphanumeric string is a bit more involved.

In order to generate a random alphanumeric string, you can use `Math.random()` to generate a random floating-point number and then convert it to a string using `Number.prototype.toString()` with a `radix` value of `36`. This will convert the number to an **alphanumeric string**.

As this string will be of **variable length**, you need to **repeat the process** as many times as required, up to the specified length. This is where `Array.from()` and `Array.prototype.some()` come in handy. Generating an array of `length` and repeating until the desired `length` is reached allows us to only run as many steps as necessary.

Finally, you can use `String.prototype.slice()` to **trim** down the generated string if it's longer than the given `length`.

```js
const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

randomAlphaNumeric(5); // '0afad'
```
