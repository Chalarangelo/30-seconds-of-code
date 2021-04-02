---
title: isNode
tags: node,browser,intermediate
---

Determines if the current runtime environment is Node.js.

- Use the `process` global object that provides information about the current Node.js process.
- Check if `process`, `process.versions` and `process.versions.node` are defined.

```js
const isNode = () =>
  typeof process !== 'undefined' &&
  !!process.versions &&
  !!process.versions.node;
```

```js
isNode(); // true (Node)
isNode(); // false (browser)
```
