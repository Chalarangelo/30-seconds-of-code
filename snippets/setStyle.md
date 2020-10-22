---
title: setStyle
tags: browser,beginner
---

Sets the value of a CSS rule for the specified HTML element.

- Use `ElementCSSInlineStyle.style` to set the value of the CSS `rule` for the specified element to `val`.

```js
const setStyle = (el, rule, val) => (el.style[rule] = val);
```

```js
setStyle(document.querySelector('p'), 'font-size', '20px');
// The first <p> element on the page will have a font-size of 20px
```
