---
title: palindromeJustSmallerThanGivenNumber
tags: number, intermediate
---

Returns the just smallest number that is a palindrome irrespective of the given number.

- Create a while loop and check if number is greater than 0 or not. If it is greater than 0 then we continue finding the palindrome by checking each and every number smaller than the given number else we say we can't find the palindrome.
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
