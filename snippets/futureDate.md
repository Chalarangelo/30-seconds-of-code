---
title: Future Date
tags: date,beginner
---

Check if date is in the future

- Use ES6 sintax

```js
const inFuture = (date) => {
    return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
};

```

```js
inFuture(new Date())
```
