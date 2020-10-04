---
title: isTouchScreen
tags: browser,intermediate
---

Checks whether the website is being opened in a device with touch screen.

- Uses the `matchMedia` method from the `window` object to detect if the pointer of the device has limited precision (`coarse`), which matches touch screen devices.

```js
const isTouchScreen = () => window.matchMedia('(pointer: coarse)').matches;
```

```js
isTouchScreen(); // true if user is using a touch screen device, false otherwise
```
