---
title: enableOrDisablePageScroll
tags: JavaScript, Browser, beginner
---

Enable/Disable HTML page scrolling.

- Add event listeners to prevent scrolling when `disableScroll()` is called.
- Remove event listeners added by `disableScroll()` to resume scrolling when `enableScroll()` is callled.
- Works for mousewheel/scroll (desktop), touchmove (mobile) and keydown events.

```js
const disableScroll = () =>
  {
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener('wheel', preventDefault, {passive: false});
    window.addEventListener('mousewheel', preventDefault, {passive: false});
    window.addEventListener('touchmove', preventDefault, {passive: false});
  }

const enableScroll = () =>
  {
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener('wheel', preventDefault, {passive: false});
    window.removeEventListener('mousewheel', preventDefault, {passive: false});
    window.removeEventListener('touchmove', preventDefault, {passive: false});
  }

const preventDefault = (e) => e.preventDefault();

const preventDefaultForScrollKeys = (e) =>
  {
    if (e.keyCode >= 32 && e.keyCode <= 40) {
        preventDefault(e);
    }
  }
```

```js
disableScroll(); // Call this to disable page scrolling
enableScroll(); // Call this to re-enable page scrolling
```
