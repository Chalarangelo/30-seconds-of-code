---
title: User prefers dark color scheme
tags: browser
expertise: intermediate
author: chalarangelo
firstSeen: 2020-05-04T12:50:35+03:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Checks if the user color scheme preference is `dark`.

- Use `Window.matchMedia()` with the appropriate media query to check the user color scheme preference.

```js
const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
```

```js
prefersDarkColorScheme(); // true
```
