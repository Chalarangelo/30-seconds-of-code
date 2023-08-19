---
title: Random Password Generator
type: snippet
language: javascript
tags: [password, generator]
cover: generator
dateModified: 2023-08-19T19:36:00+05:00
---

Generate a random password with customizable length and character sets.

- The function generates a random password.
- You can specify the password length and character sets to include.
- Supports uppercase letters, lowercase letters, numbers, and special characters.
- By default `useUppercase, useLowercase, useNumbers, useSpecialChars` parameters are true.
- use Booleans (true, false) in `useUppercase, useLowercase, useNumbers, useSpecialChars` parameters to change it.

```js
const generateRandomPassword = (
  length,
  useUppercase = true,
  useLowercase = true,
  useNumbers = true,
  useSpecialChars = true
) => {
  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*()-=_+[]{}|;:,.<>?",
  };

  let allChars = "";
  if (useUppercase) allChars += chars.uppercase;
  if (useLowercase) allChars += chars.lowercase;
  if (useNumbers) allChars += chars.numbers;
  if (useSpecialChars) allChars += chars.special;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};
```

```js
const newPassword = generateRandomPassword(16, false, true, true, false);
console.log(newPassword); // Example Output: "5v9d1m3q8n2c7h0k"
```
