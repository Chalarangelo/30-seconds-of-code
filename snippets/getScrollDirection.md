---
title: getScrollDirection
tags: function,type,intermediate
---

Returns `true` if scrolled up and `false` if scrolled down.

- ON the call of the function, it sets a scroll event listener to the `window` object 
- Returns `true` if scrolled up and `false` if scrolled down.

```js
function findScrollDirection() {
  let scrollBefore = window.scrollY;
  window.addEventListener("scroll", () => {
    return (scrollBefore > window.scrollY ? true : false);
    scrollBefore = window.scrollY;
  });
}
```

```js
findScrollDirection(); // Returns 'true' if scrolled up. Returns 'false' if scrolled down.
```