---
title: Call or return
tags: function
expertise: beginner
author: chalarangelo
cover: blog_images/cows.jpg
firstSeen: 2022-04-04T05:00:00-04:00
---

Calls the argument if it's a function, otherwise returns it.

- Use the `typeof` operator to check if the given argument is a function.
- If it is, use the spread operator (`...`) to call it with the rest of the given arguments. Otherwise, return it.

```js
const callOrReturn = (fn, ...args) =>
  typeof fn === 'function' ? fn(...args) : fn;
```

```js
callOrReturn(x => x + 1, 1); // 2
callOrReturn(1, 1); // 1
```
