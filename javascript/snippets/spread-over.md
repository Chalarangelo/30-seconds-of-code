---
title: Convert function from variadic
type: snippet
tags: [function]
cover: tent-stars
dateModified: 2021-06-13T13:50:25+03:00
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
