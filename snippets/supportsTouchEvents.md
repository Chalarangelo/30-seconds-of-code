---
title: Device supports touch events
tags: browser
expertise: beginner
firstSeen: 2020-05-04T12:57:23+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
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
