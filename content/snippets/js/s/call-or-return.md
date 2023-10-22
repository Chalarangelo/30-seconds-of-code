---
title: Call or return
type: snippet
language: javascript
tags: [function]
cover: cows
dateModified: 2022-04-04
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
