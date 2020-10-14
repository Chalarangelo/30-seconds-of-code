---
title: getDomPath
tags: javascript, browser
---

Returns an array of an element's ancestors ordered from the document
root to the given element

- Pass an element to the function, returns an array of elements
- Returned array has given element and all ancestor elements in order from document root downward

```js
const getDomPath = (el) =>
  {
    const path = [];
    while (el) {
      path.unshift(el);
      el = el.parentElement;
    }
    return path;
  }
```

```js
functionName(document.querySelector('nav')); // [html, body, header, nav]
```
