---
title: Scroll position
tags: browser
cover: tranquil-lake
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Returns the scroll position of the current page.

- Use `Window.pageXOffset` and `Window.pageYOffset` if they are defined, otherwise `Element.scrollLeft` and `Element.scrollTop`.
- Omit the single argument, `el`, to use the global `Window` object.

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

```js
getScrollPosition(); // {x: 0, y: 200}
```
