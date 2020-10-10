---
title: randomString
tags: string,beginner
---

Explain briefly what the snippet does.

- generate random string by adding random letter in which stores in characters
- assign/picking random letter by using Math.random()

```js
const makeId = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
```

```js
makeId(5); // create random string with length of 5
```