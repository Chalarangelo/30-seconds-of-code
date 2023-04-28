---
title: User prefers dark color scheme
type: snippet
tags: [browser]
author: chalarangelo
cover: blue-lake
dateModified: 2020-10-22T20:24:04+03:00
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
