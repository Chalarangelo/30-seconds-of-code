---
title: Get elements bigger than viewport
tags: browser
expertise: intermediate
firstSeen: 2020-10-06T17:41:22+03:00
lastUpdated: 2020-10-22T20:23:47+03:00
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
