---
title: isValidEmail
tags: email, beginner
firstSeen: 2021-06-13T05:00:00-04:00
---

Checks if the given email is valid or invalid.

- Create a varible `re` to store the correct email format.
- Use `test()` function to check if `email` is a valid or invalid email.
  

```js
const isValidEmail = (email) =>
{
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return re.test(email);
}
```

```js
isValidEmail('abc@gmail.com'); // true
isValidEmail('kok90129mail'); // false
```