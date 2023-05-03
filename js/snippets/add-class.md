---
title: Add class to HTML element
type: snippet
tags: [browser]
author: chalarangelo
cover: budapest-palace
dateModified: 2020-12-30T19:21:15+02:00
---

Adds a class to an HTML element.

- Use `Element.classList` and `DOMTokenList.add()` to add the specified class to the element.

```js
const addClass = (el, className) => el.classList.add(className);
```

```js
addClass(document.querySelector('p'), 'special');
// The paragraph will now have the 'special' class
```
