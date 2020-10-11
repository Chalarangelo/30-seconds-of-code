---
title: checkPassword
tags: regexp, beginner
---

Checks if a password is up to eight characters long, uses at least one number.

- Check the length with the String.prototype.length
- Use case-insensitive regular expressions to check if we have letters.
- Use regular expressions to check if we have numbers.

```js
const checkPassword = (somePassword) => {
  if (somePassword.length < 8) return false;
  if ( !(/[a-z]/i.test(somePassword)) ) return false;
  if ( !(/[0-9]/.test(somePassword)) ) return false;
  return true;
}
```

```js
checkPassword(''); // false
checkPassword('hello'); // false
checkPassword('12345678'); // false
checkPassword('hello123'); // true
```
