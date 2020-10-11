---
title: isRegularExpression
tags: string,intermediate
---

Check if a given string is a Regular Expression

- Use `Object.prototype.toString.call()` with a `value` to make a detail check of the type of the given object ([reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)).

```js
const isRegularExpression = (value) => {
  return Object.prototype.toString.call(value) === '[object RegExp]';
};
```

```js
isRegularExpression(/^30-seconds/); // true
isRegularExpression('30-seconds'); // false
```
