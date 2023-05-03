---
title: Smooth scroll element into view
type: snippet
tags: [browser,css]
cover: carrots
dateModified: 2020-10-22T20:24:30+03:00
---

Smoothly scrolls the element on which it's called into the visible area of the browser window.

- Use `Element.scrollIntoView()` to scroll the element.
- Use `{ behavior: 'smooth' }` to scroll smoothly.

```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
```

```js
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar');
// scrolls smoothly to the first element with a class of fooBar
```
