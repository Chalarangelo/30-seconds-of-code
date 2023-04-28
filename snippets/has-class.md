---
title: Check if HTML element has class
type: snippet
tags: [browser,css]
cover: interior
dateModified: 2020-10-19T22:49:51+03:00
---

Checks if the given element has the specified class.

- Use `Element.classList` and `DOMTokenList.contains()` to check if the element has the specified class.

```js
const hasClass = (el, className) => el.classList.contains(className);
```

```js
hasClass(document.querySelector('p.special'), 'special'); // true
```
