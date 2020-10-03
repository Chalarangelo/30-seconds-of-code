---
title: generateRandomAlphanumericString
tags: math,function,beginner
---

Generates a random alphanumeric string.

- Uses Math.random().toString(36) to generate alphanumeric characters.
- Uses while to concatenate all generated characters.

```js
const generateRandomAlphanumericString = length => {
    let randomString = "";
    while(randomString.length < length) {
      randomString += Math.random().toString(36).substr(2);
    }
    return randomString.substr(0, length);
}
```

```js
generateRandomAlphanumericString(20); // 'v16v0zjbdbr3f9tmglrl'
```
