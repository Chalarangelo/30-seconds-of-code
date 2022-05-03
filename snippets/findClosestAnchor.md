---
title: Find closest anchor
tags: browser
expertise: intermediate
author: chalarangelo
cover: blog_images/colorful-lounge.jpg
firstSeen: 2021-04-22T08:45:39+03:00
lastUpdated: 2021-04-22T08:45:39+03:00
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
