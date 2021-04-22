---
title: findClosestAnchor
tags: browser,intermediate
---

Finds the anchor node closest to the given `node`, if any.

- Use a `for` loop and `Node.parentNode` to traverse the node tree upwards from the given `node`.
- Use `Node.nodeName` and `String.prototype.toLowerCase()` to check if any given node is an anchor (`'a'`).
- If no matching node is found, return `null`.

```js
const findClosestAnchor = node => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.nodeName.toLowerCase() === 'a') return n;
  return null;
};
```

```js
findClosestAnchor(document.querySelector('a > span')); // a
```
