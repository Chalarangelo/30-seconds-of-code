---
title: spreadOver
tags: function,intermediate
---

Takes a variadic function and returns a function that accepts an array of arguments.

- Use a closure and the spread operator (`...`) to map the array of arguments to the inputs of the function.

```js
const spreadOver = fn => argsArr => fn(...argsArr);
```

```js
const arrayMax = spreadOver(Math.max);
arrayMax([1, 2, 3]); // 3
```
