---
title: Vertical offset of element
type: snippet
language: javascript
tags: [browser]
author: chalarangelo
cover: waves-from-above-2
dateModified: 2021-01-05
---

Finds the distance from a given element to the top of the document.

- Use a `while` loop and `HTMLElement.offsetParent` to move up the offset parents of the given element.
- Add `HTMLElement.offsetTop` for each element and return the result.

```js
const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};
```

```js
getVerticalOffset('.my-element'); // 120
```
