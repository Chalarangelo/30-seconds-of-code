---
title: Element is visible in viewport
tags: browser
expertise: intermediate
cover: blog_images/flower-portrait-1.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Checks if the element specified is visible in the viewport.

- Use `Element.getBoundingClientRect()`, `Window.innerWidth` and `Window.innerHeight` to determine if a given element is visible in the viewport.
- Omit the second argument to determine if the element is entirely visible, or specify `true` to determine if it is partially visible.

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```

```js
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
```
