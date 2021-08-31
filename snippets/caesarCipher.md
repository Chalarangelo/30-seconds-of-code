---
title: caesarCipher
tags: algorithm,string,beginner
firstSeen: 2020-12-28T20:10:18+02:00
lastUpdated: 2020-12-29T12:29:21+02:00
---

Encrypts or decrypts a given string using the Caesar cipher.

- Use the modulo (`%`) operator and the ternary operator (`?`) to calculate the correct encryption/decryption key.
- Use the spread operator (`...`) and `Array.prototype.map()` to iterate over the letters of the given string.
- Use `String.prototype.charCodeAt()` and `String.fromCharCode()` to convert each letter appropriately, ignoring special characters, spaces etc.
- Use `Array.prototype.join()` to combine all the letters into a string.
- Pass `true` to the last parameter, `decrypt`, to decrypt an encrypted string.

```js
const caesarCipher = (str, shift, decrypt = false) => {
  const string = decrypt ? (26 - shift) % 26 : shift;
  const n = string > 0 ? string : 26 + (string % 26);
  return [...str]
    .map((left, index) => {
      const character = str.charCodeAt(index);
      if (character >= 65 && character <= 90)
        return String.fromCharCode(((character - 65 + n) % 26) + 65);
      if (character >= 97 && character <= 122)
        return String.fromCharCode(((character - 97 + n) % 26) + 97);
      return left;
    })
    .join('');
};
```

```js
caesarCipher('Hello World!', -3); // 'Ebiil Tloia!'
caesarCipher('Ebiil Tloia!', 23, true); // 'Hello World!'
```
