---
title: Element is focused
type: snippet
language: javascript
tags: [browser]
author: chalarangelo
cover: female-hiker
dateModified: 2020-10-19T18:51:03+03:00
---

Checks if the given element is focused.

- Use `Document.activeElement` to determine if the given element is focused.

```js
const elementIsFocused = el => (el === document.activeElement);
```

```js
elementIsFocused(el); // true if the element is focused
```
