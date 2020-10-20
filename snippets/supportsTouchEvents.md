---
title: supportsTouchEvents
tags: browser,beginner
---

Checks if touch events are supported.

- Check if `ontouchstart` exists in `window`.

```js
const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;
```

```js
supportsTouchEvents(); // true
```
