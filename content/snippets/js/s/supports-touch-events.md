---
title: Device supports touch events
type: snippet
language: javascript
tags: [browser]
cover: man-red-sunset
dateModified: 2020-10-22
---

Checks if touch events are supported.

- Check if `'ontouchstart'` exists in the `Window`.

```js
const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;
```

```js
supportsTouchEvents(); // true
```
