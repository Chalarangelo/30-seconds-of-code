---
title: caesar
tags: function,recursion,intermediate
---

Encrypt and decrypt your messages using Caesar Cipher.

- Call the provided function, `encrypt`, with up to `2` arguments, `text` i.e. the message to be encrypted and `shift` the caesar shit to be applied.
- Call the provided function, `decrypt`, with up to `2` arguments, `text` i.e. the message to be decrypted and `shift` the caesar shit to be applied.

```js
const encrypt = (text, shift) => {
  var result = '';

  //looping through each character in the entered text
  for (var i = 0; i < text.length; i++) {
    //getting the character code of each letter
    var ch = text.charCodeAt(i);

    // handling uppercase letters
    if (ch >= 65 && ch <= 90) {
      result += String.fromCharCode(((ch - 65 + shift) % 26) + 65);

      // handling lowercase Letters
    } else if (ch >= 97 && ch <= 122) {
      result += String.fromCharCode(((ch - 97 + shift) % 26) + 97);

      // In case of character isn't a letter, passing it through
    } else {
      result += text.charAt(i);
    }
  }
  return result;
};

const decrypt = (text, shift) => {
  var result = '';
  shift = (26 - shift) % 26;
  result = encrypt(text, shift);
  return result;
};

// Main function to take users text, shifting amount and encrypt/decrypt based on their choice.
const main = () => {
  var text = window.prompt('Enter your text: ');
  var shift = window.prompt('Enter the shift to be applied: ');
  var todo = window.prompt("Enter 'e' for encrypt or 'd' for decrypt: ");
  var res;
  if (todo == 'e') {
    res = encrypt(text, shift);
  } else if (todo == 'd') {
    res = decrypt(text, shift);
  }
  return res;
};
```

```js
encrypt(thirtysecondsofcode, 7); //aopyafzljvukzvmjvkl
decrypt(aopyafzljvukzvmjvkl, 7); //thirtysecondsofcode
```
