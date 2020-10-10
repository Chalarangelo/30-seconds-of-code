---
title: Palindrome Using Recursion
tags: string,intermediate,recursion
---

Returns `true` if the given string is a palindrome, `false` otherwise.

- If the string is empty or undefined then returns `false`
- Check whether the givem input is a String or not.
- If not then convert it to String.
- Check for base case which is that if only one element remains then the string is a Palindrome
- If we have more then one characters then remove the first and last character from the string and recursively call the Palindrome function again.

```js
const Palindrome = str => {
  if (str === null || str === undefined) {
    return false
  }

  if (typeof str !== 'string') {
    str = str.toString()
  }

  if (str.length === 1 || str.length === 0) {
    return true
  }

  if (str[0] !== str[str.length - 1]) {
    return false
  } else {
    return Palindrome(str.slice(1, str.length - 1))
  }
}
```

```js
Palindrome('a'); // true
Palindrome('abba'); // true
Palindrome('ababa'); // true
Palindrome('abbxa'); // false
Palindrome('abxa'); // false
```
