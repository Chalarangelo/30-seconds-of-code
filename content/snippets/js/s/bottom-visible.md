---
title: Check if bottom of page is visible
type: snippet
language: javascript
tags: [browser]
cover: hiking-walking
dateModified: 2020-10-22
---

Checks if the bottom of the page is visible.

- Use `Window.scrollY`, `Element.scrollHeight` and `Element.clientHeight` to determine if the bottom of the page is visible.

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);
```

```js
bottomVisible(); // true
```
