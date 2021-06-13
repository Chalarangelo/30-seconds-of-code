---
title: supportsTouchEvents
tags: browser,beginner
firstSeen: 2020-05-04T12:57:23+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Checks if touch events are supported.

- Check if `'ontouchstart'` exists in `window`.

```js
const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;
```

```js
supportsTouchEvents(); // true
```
