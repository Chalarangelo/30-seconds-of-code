---
title: passwordGenerator
tags: string,Math,intermediate
---

The function generates random strong password of supplied length with alphabets (uppercase as well as lowercase), numbers and special characters.

- We first check the length of the password to be generated. If no length is supplied 10 characters password is considered to be strong enough and hence generates a 10 character password.
- Then we have the string, numbers and characters collection which would be used to generate password.
- Then we loop until the length of the password is not equal to the desired length. Here we have used Math.random() which generates random numbers between 0 and 1. we are getting any random index(es) from string, numbers and special characters and joining them to the password string.
- Once the desired length password is generated we are sorting the characters randomly so that it becomes difficult to find a pattern in our password.

```js
const passwordGenerator = (passwordLength) => {
  const length = passwordLength ? passwordLength : 10;
  const string = "abcdefghijklmnopqrstuvwxyz";
  const numeric = "0123456789";
  const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  let character = "";
  while (password.length < length) {
    entity1 = Math.ceil(string.length * Math.random() * Math.random());
    entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
    entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
    hold = string.charAt(entity1);
    hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
    character += hold;
    character += numeric.charAt(entity2);
    character += punctuation.charAt(entity3);
    password = character;
  }
  password = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");
  return password.substr(0, length);
};
```

```js
passwordGenerator(8); // "G2&g4&7}"
passwordGenerator(); // "&3L121eH;*"
```
