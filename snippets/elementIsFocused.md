---
title: elementIsFocused
tags: browser,beginner
firstSeen: 2020-08-07T15:21:27+03:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Checks if the given element is focused.

- Use `Document.activeElement` to determine if the given element is focused.

```js
const elementIsFocused = el => (el === document.activeElement);
```

```js
elementIsFocused(el); // true if the element is focused
```
