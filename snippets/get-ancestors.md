---
title: Get element ancestors
type: snippet
tags: [browser]
author: chalarangelo
cover: interior-8
dateModified: 2021-01-05T22:45:34+02:00
---

Returns all the ancestors of an element from the document root to the given element.

- Use `Node.parentNode` and a `while` loop to move up the ancestor tree of the element.
- Use `Array.prototype.unshift()` to add each new ancestor to the start of the array.

```js
const getAncestors = el => {
  let ancestors = [];
  while (el) {
    ancestors.unshift(el);
    el = el.parentNode;
  }
  return ancestors;
};
```

```js
getAncestors(document.querySelector('nav'));
// [document, html, body, header, nav]
```
