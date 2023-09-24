---
title: Random alphanumeric string
type: snippet
language: javascript
tags: [string,random]
cover: gold-typewriter
dateModified: 2020-10-22
---

Generates a random string with the specified length.

- Use `Array.from()` to create a new array with the specified `length`.
- Use `Math.random()` generate a random floating-point number.
- Use `Number.prototype.toString()` with a `radix` value of `36` to convert it to an alphanumeric string.
- Use `String.prototype.slice()` to remove the integral part and decimal point from each generated number.
- Use `Array.prototype.some()` to repeat this process as many times as required, up to `length`, as it produces a variable-length string each time.
- Finally, use `String.prototype.slice()` to trim down the generated string if it's longer than the given `length`.

```js
const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};
```

```js
randomAlphaNumeric(5); // '0afad'
```
