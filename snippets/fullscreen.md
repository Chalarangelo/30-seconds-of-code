---
title: fullscreen
tags: browser,beginner
---

This snippet lets you start and stop the fullscreen mode

- Uses `document.documentElement.requestFullscreen()` and `document.exitFullscreen()` functions to change the browsers state.
- If no parameter is given, it will default to enable the fullscreen mode.
- Usage is limited to user interaction or a device orientation change; otherwise it will fail.

```js
const fullscreen = (mode=true) => {
  if (mode) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }};
```

```js
fullscreen(); // Browser in fullscreen mode
fullscreen(false); // Browser no longer in fullscreen mode
```
