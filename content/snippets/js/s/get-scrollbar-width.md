---
title: Scrollbar width
type: snippet
language: javascript
tags: [browser]
cover: violin
author: chalarangelo
dateModified: 2022-07-16
---

Calculates the width of the window's vertical scrollbar.


- Use `Window.innerWidth` to get the interior width of the window.
- Use `Element.clientWidth` to get the inner width of the `Document` element.
- Subtract the two values to get the width of the vertical scrollbar.

```js
const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;
```

```js
getScrollbarWidth(); // 15
```
