---
title: isISOString
tags: string,beginner
---

Checks if the string provided follows the simplified extended ISO format ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).

- Tests `val` against a regular expression.
- The regular expression follows the syntax of an ISO string.
- It returns `true` if `val` is an ISO string.

```js
const isISOString = val => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(val);
}
```

```js
isISOString('2020-10-25T20:41:52.931Z'); // true
isISOString('2020-10-25'); // false
```
