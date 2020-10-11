---
title: toPascalCase
tags: regex, array, intermediate
---

Convert the string to `Pascal` case.

- Break the string into words by regex, then make the 1st character of each word to capital letter and combine them together.

```js
const toPascalCase = (str) =>
  str &&
  str
    .match(/[a-z]+/gi)
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join("");
```

```js
toPascalCase("hello world"); // 'HelloWorld'
toPascalCase("hello-world"); // 'HelloWorld'
toPascalCase("hello_world"); // 'HelloWorld'
```
