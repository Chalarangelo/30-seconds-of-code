---
title: Detect device type
type: snippet
tags: [browser,regexp]
cover: clutter-2
dateModified: 2020-10-22T20:23:47+03:00
---

Detects whether the page is being viewed on a mobile device or a desktop.

- Use a regular expression to test the `Navigator.userAgent` property to figure out if the device is a mobile device or a desktop.

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';
```

```js
detectDeviceType(); // 'Mobile' or 'Desktop'
```
