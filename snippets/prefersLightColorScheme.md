---
title: prefersLightColorScheme
tags: browser,intermediate
---

Returns `true` if the user color scheme preference is `light`, `false` otherwise.

- Use `window.matchMedia()` with the appropriate media query to check the user color scheme preference.

```js
const prefersLightColorScheme = () =>
  window && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
```

```js
prefersLightColorScheme(); // true
```
