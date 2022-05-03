---
title: User prefers light color scheme
tags: browser
expertise: intermediate
author: chalarangelo
cover: blog_images/dark-mode.jpg
firstSeen: 2020-05-04T12:50:35+03:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Checks if the user color scheme preference is `light`.

- Use `Window.matchMedia()` with the appropriate media query to check the user color scheme preference.

```js
const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;
```

```js
prefersLightColorScheme(); // true
```
