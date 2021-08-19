---
title: palindromeJustGreaterThanGivenNumber
tags: number, intermediate
firstSeen: 2021-08-19T21:49:00+05:30
---

Returns the just greater number that is a palindrome irrespective of the given number.

- Create a while loop and check if number is greater than 0 or not. If it is greater than 0 then we continue finding the palindrome by checking each and every number greater than the given number else we say we can't find the palindrome.
- Convert the number to string using `Object.prototype.toString()`.
- Use the spread operator (`...`) to split the string into individual characters.
- Use `Array.prototype.reverse()`, `String.prototype.join('')` and compare the result to the first string.

```js
const palindromeJustGreaterThanGivenNumber = (num) => {
  while (num > 0) {
    num++;
    const s = num.toString();
    if (s === [...s].reverse().join("")) {
      return parseInt(s);
    }
  }

  return "Palindrome not found"; // Base Case
};
```

```js
palindromeJustGreaterThanGivenNumber(25); // 33
palindromeJustGreaterThanGivenNumber(123); // 131
```
