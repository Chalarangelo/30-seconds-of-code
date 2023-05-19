---
title: Add class to HTML element
type: snippet
language: javascript
tags: [browser]
author: chalarangelo
cover: shiny-mountains
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
