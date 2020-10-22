---
title: prefersLightColorScheme
tags: browser,intermediate
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
