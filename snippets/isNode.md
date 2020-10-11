---
title: isNode
tags: node,intermediate
---

Check if the current runtime environment is [Node.js](https://nodejs.org)

- The `process` object is a global that provides information about the current Node.js process.
- Check if the current enviroment has the `process` object defined and the version of Node.js is available.

```js
const isNode = () =>
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null;
```

```js
isNode(); // true
```
