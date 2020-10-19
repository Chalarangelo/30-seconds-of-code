---
title: isDeviceOffline
tags: JavaScript,Browser,intermediate
---

A simpleset utility method, to check if device went offline.


- The method returns a boolean value, with `true` meaning offline and `false` meaning online
- Use browser's `navigator` properties, to detect internet connect.

```js
const isDeviceOffline = () => !window.navigator.onLine;
```

```js
isDeviceOffline(); // false || true'
```
