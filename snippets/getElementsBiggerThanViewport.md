---
title: getElementsBiggerThanViewport
tags: browser,intermediate
---

Returns an array of HTML elements whose width is larger than that of the viewport's.

- Use `HTMLElement.prototype.offsetWidth()` to get the width of the `document`.
- Use `Array.prototype.reduce()` on the result of `document.querySelectorAll()` to check the width of all elements in the document.

```js
const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].reduce((acc, el) => {
    if (el.offsetWidth > docWidth) acc.push(el);
    return acc;
  }, []);
}
```

```js
getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />
```
