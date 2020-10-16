---
title: generateUniqueString
tags: string,random,unique,intermediate
---

Generate unique string

- Use `Math.prototype.random` to create a random number
- Use `Number.prototype.toString` and pass `16` as radix parameter to convert number to hexadecimal number 
- Use `String.prototype.slice` to skip first two characters because `Number.prototype.toString` will return `0.<number>`

```js
const generateUniqueString = () => Math.random().toString(16).slice(2)
```

```js
generateUniqueString(); // f3c9049d08d34
```
