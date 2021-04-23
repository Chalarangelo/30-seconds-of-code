---
title: reverseWords
tags: string,beginner
---

Reverses the order of words in a given sentence without actually reversing the letters inside each word.

- Split the given input string into an array of substrings based on a white-space using `String.prototype.split(' ')`.
- Use `Array.prototype.reverse()` to reverse the array of substrings received from the above step.
- Combine the array of substrings based on a white-space to get the reversed sentence as output using `String.prototype.join(' ')`.

```js
const reverseWords = sentence =>
  {
    // base case
    if (typeof sentence !== 'string') {
      throw new TypeError('Value is not a string')
    }
    return sentence.split(' ').reverse().join(' ');
  }
```

```js
reverseWords('Wonder Cars'); // 'Cars Wonder'
reverseWords('Wonder'); // Wonder
reverseWords(245); // Uncaught TypeError: Value is not a string
```
