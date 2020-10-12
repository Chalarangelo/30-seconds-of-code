---
title: toString
tags: string,beginner
---

Converts a given input to string.

- Check if `value` is undefined and, if so, use `String()` constructor to produce an empty string, otherwise convert the given input to string by using template literals.

```js
const toString = (value) => (value === undefined ? String() : `${value}`);
```

```js
toString("abc"); // 'abc'
toString(1); // '1'
toString(undefined); // ''
```
