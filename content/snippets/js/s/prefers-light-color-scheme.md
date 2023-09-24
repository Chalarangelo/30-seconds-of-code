---
title: User prefers light color scheme
type: snippet
language: javascript
tags: [browser]
author: chalarangelo
cover: dark-mode
dateModified: 2020-10-22
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
