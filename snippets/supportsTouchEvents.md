---
title: supportsTouchEvents
tags: browser,intermediate
---

Returns `true` if touch events are supported, `false` otherwise.

Check if `ontouchstart` exists in `window` or `window.DocumentTouch` is true and the current `document` is an instance of it.

```js
const supportsTouchEvents = () =>
  window &&
  ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
```

```js
supportsTouchEvents(); // true
```
