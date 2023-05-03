---
title: Scroll page to top
type: snippet
tags: [browser]
cover: tranquil-lake
dateModified: 2020-10-22T20:24:30+03:00
---

Smooth-scrolls to the top of the page.

- Get distance from top using `Document.documentElement` or `Document.body` and `Element.scrollTop`.
- Scroll by a fraction of the distance from the top.
- Use `Window.requestAnimationFrame()` to animate the scrolling.

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

```js
scrollToTop(); // Smooth-scrolls to the top of the page
```
