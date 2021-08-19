---
title: palindromeJustSmallerThanGivenNumber
tags: number, intermediate
---

Returns the just smallest number that is a palindrome irrespective of the given number.

- Convert the number to string using `Object.prototype.toString()`.
- Use the spread operator (`...`) to split the string into individual characters.
- Use `Array.prototype.reverse()`, `String.prototype.join('')` and compare the result to the first string.

```js
const palindromeJustSmallerThanGivenNumber = (num) => {
  while (num--) {
    const s = num.toString();
    if (s === [...s].reverse().join("")) {
      return parseInt(s);
    }
  }

  return "Palindrome not found"; // if entered number is 1
};
```

```js
palindromeJustSmallerThanGivenNumber(25); // 22
palindromeJustSmallerThanGivenNumber(123); // 121
```
