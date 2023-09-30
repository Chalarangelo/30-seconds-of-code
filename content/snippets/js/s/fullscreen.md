---
title: Toggle fullscreen mode
type: snippet
language: javascript
tags: [browser]
cover: cloudy-mountaintop-2
dateModified: 2020-10-19
---

Opens or closes an element in fullscreen mode.

- Use `Document.querySelector()` and `Element.requestFullscreen()` to open the given element in fullscreen.
- Use `Document.exitFullscreen()` to exit fullscreen mode.
- Omit the second argument, `el`, to use `body` as the default element.
- Omit the first element, `mode`, to open the element in fullscreen mode by default.

```js
const fullscreen = (mode = true, el = 'body') =>
  mode
    ? document.querySelector(el).requestFullscreen()
    : document.exitFullscreen();
```

```js
fullscreen(); // Opens `body` in fullscreen mode
fullscreen(false); // Exits fullscreen mode
```
