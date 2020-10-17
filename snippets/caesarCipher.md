---
title: caesarCipher
tags: string,cryptography,intermediate
---

This snippet helps you to apply caesar transformation to a supplied string. After passing a string and a shift, the function will apply the shift to the provided string.

- First we check and convert the shift to a positive value, if no value of `shift` is provided, it defaults to `12`
- We split the string into letters at the start and join them after processing at the end
- A regex check is used to segregate lowercase and uppercase letters
- The `shift` is then applied to the letters

```js
const caesarCipher = (string, shift) => {
  // Convert the shift to a positive value
  shift = shift < 0 ? shift + 26 : shift;

  // Modify the string and assign it back
  string = string
    .split("")
    .map((element) => {
      // Handle Uppercase Letters
      if (/^[A-Z]$/.test(element))
        element = String.fromCharCode(
          ((element.charCodeAt() + shift - 65) % 26) + 65
        );

      // Handle Lowercase Letters
      if (/^[a-z]$/.test(element))
        element = String.fromCharCode(
          ((element.charCodeAt() + shift - 97) % 26) + 97
        );
      return element;
    })
    .join("");
  return string;
};
```

```js
caesarCipher("We attack at dawn!"); // 'Ks ohhoqy oh rokb!'
```
