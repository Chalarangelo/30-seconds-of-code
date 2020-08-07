---
title: elementIsFocused
tags: browser,intermediate
---

Returns `true` if the given element is focused, `false` otherwise.

Use `document.activeElement` to determine if the given element is focused.

```js
const elementIsFocused = el => (el === document.activeElement);
```

```js
elementIsFocused(el); // true if the element is focused
```
