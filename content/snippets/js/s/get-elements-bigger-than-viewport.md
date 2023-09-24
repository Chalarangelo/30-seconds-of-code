---
title: Get elements bigger than viewport
type: snippet
language: javascript
tags: [browser]
cover: case-study
dateModified: 2020-10-22
---

Returns an array of HTML elements whose width is larger than that of the viewport's.

- Use `HTMLElement.offsetWidth` to get the width of the `Document`.
- Use `Array.prototype.filter()` on the result of `Document.querySelectorAll()` to check the width of all elements in the document.

```js
const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};
```

```js
getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />
```
