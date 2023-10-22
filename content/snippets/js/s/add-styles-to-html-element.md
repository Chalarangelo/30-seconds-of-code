---
title: Add styles to HTML element
type: snippet
language: javascript
tags: [browser]
cover: digital-nomad-14
dateModified: 2021-01-07
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
