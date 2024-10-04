---
title: Implement the Caesar cipher in JavaScript
shortTitle: Caesar cipher
language: javascript
tags: [algorithm,string]
cover: waves-from-above
excerpt: The Caesar cipher is a simple substitution cipher, which can be easily implemented with a few lines of JavaScript code.
listed: true
dateModified: 2023-12-17
---

## Definition

The [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) is a simple **substitution cipher**, in which each letter is replaced by another letter a fixed number of positions down the alphabet. For example, with a left shift of `3`, `D` would be replaced by `A`, `E` would become `B`, and so on.

## Implementation

> [!NOTE]
>
> The following implementation only works for **Latin letters** (`A` to `Z` and `a` to `z`), ignoring all other characters.

Depending on the **mode** (decided by the `decrypt` parameter), the cipher either adds or subtracts the `shift` from the character code of each letter, wrapping around the alphabet as needed. This is achieved by using the modulo operator (`%`) and the ternary operator (`?`).

Then, using the spread operator (`...`) and `Array.prototype.map()`, the algorithm **iterates over the letters** of the given string. For each letter, it **converts it to its character code** using `String.prototype.charCodeAt()`, **applies the shift** and **converts it back to a letter** using `String.fromCharCode()`. If the character code is not in the range `65` (`A`) to `90` (`Z`) or `97` (`a`) to `122` (`z`), it is left as is.

Finally, the letters are **combined into a string** using `Array.prototype.join()`.

```js
const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join('');
};

caesarCipher('Hello World!', 23); // 'Ebiil Tloia!'
caesarCipher('Hello World!', -3); // 'Ebiil Tloia!'
caesarCipher('Ebiil Tloia!', 23, true); // 'Hello World!'
caesarCipher('Ebiil Tloia!', -3, true); // 'Hello World!'
```

> [!CAUTION]
>
> The Caesar cipher is one of the easiest ciphers to break. **Do not use it for sensitive data.**
