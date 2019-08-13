---
title: smoothScroll
tags: browser,css,intermediate
---

Smoothly scrolls the element on which it's called into the visible area of the browser window.

Use `.scrollIntoView` method to scroll the element. 
Pass `{ behavior: 'smooth' }` to `.scrollIntoView` so it scrolls smoothly.

```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
```

```js
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar
```