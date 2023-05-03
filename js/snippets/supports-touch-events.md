---
title: Device supports touch events
type: snippet
tags: [browser]
author: chalarangelo
cover: man-red-sunset
dateModified: 2020-10-22T20:24:30+03:00
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
