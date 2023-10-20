---
title: Element is focused
type: snippet
language: javascript
tags: [browser]
cover: female-hiker
dateModified: 2020-10-19
---

Checks if the given element is focused.

- Use `Document.activeElement` to determine if the given element is focused.

```js
const elementIsFocused = el => (el === document.activeElement);
```

```js
elementIsFocused(el); // true if the element is focused
```
