---
title: isNode
tags: node,browser,intermediate
---

Determines if the current runtime environment is Node.js.

- Use the `process` global object that provides information about the current Node.js process.
- Check if `process` is defined and `process.versions`, `process.versions.node` are not `null`.

```js
const isNode = () =>
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null;
```

```js
isNode(); // true (Node)
isNode(); // false (browser)
```
