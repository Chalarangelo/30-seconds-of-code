---
title: Check if function exists before calling 
tags: function,beginner
firstSeen: 2021-8-5T17:55:51+02:00
lastUpdated: 2021-8-6T22:49:51+03:00
---

Check if the function exists before calling it to avoid the error

- Use `typeof` in order to check the type and if it is function call the function.

```js
if (typeof yourFunctionName == 'function') { 
  yourFunctionName(); 
}
```

```js
if (typeof checkExistance == 'function') {
    checkExistance();
}
