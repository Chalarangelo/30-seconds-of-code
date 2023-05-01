---
title: Add styles to HTML element
type: snippet
tags: [browser]
author: chalarangelo
cover: digital-nomad-14
dateModified: 2021-01-07T00:37:43+02:00
---

Adds the provided styles to the given HTML element.

- Use `Object.assign()` and `HTMLElement.style` to merge the provided `styles` object into the style of the given element.

```js
const addStyles = (el, styles) => Object.assign(el.style, styles);
```

```js
addStyles(document.getElementById('my-element'), {
  background: 'red',
  color: '#ffff00',
  fontSize: '3rem'
});
```
