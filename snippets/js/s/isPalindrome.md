---
title: check string is palindrome or not
type: snippet
language: javascript
tags: [string, palindrome]
cover: image
dateModified: 2023-07-24
---

Imagine having a handy JavaScript function that effortlessly checks whether a given string is a palindrome or not. Look no further! Meet the "isPalindrome" function, a compact and efficient solution to determine palindrome strings in an instant.

Here's a sneak peek at how it works:

```js
function isPalindrome(str) {
	const reversedStr = str.split('').reverse().join('');
	return str === reversedStr;
}

const text = 'level';
const isPalindromeResult = isPalindrome(text);
console.log('Is Palindrome:', isPalindromeResult); // Output: true
```
