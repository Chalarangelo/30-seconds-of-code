---
title: generateRandomString
tags: string,intermediate
---

User can generate random string based on length.
Even, The value of two strings of length 10 is also random


Turning a parameter into a function is the random string of the length user want to generate.
In function, `characters` is declare as a const . Using `Math.floor` and `Math.ranndom` we can generate random string based on length.

```js
const generateRandomString =(length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
```

```js
generateRandomString(10); // '9VisXnkzhs'
generateRandomString(10); // 'F6MWKGFhDg'
generateRandomString(15); // 'UTfzZSburgHsqJB'
```
