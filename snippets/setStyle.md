---
title: Set style for element
tags: browser
cover: laptop-plants-2
firstSeen: 2017-12-29T00:08:17+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Sets the value of a CSS rule for the specified HTML element.

- Use `HTMLElement.style` to set the value of the CSS `rule` for the specified element to `val`.

```js
const setStyle = (el, rule, val) => (el.style[rule] = val);
```

```js
setStyle(document.querySelector('p'), 'font-size', '20px');
// The first <p> element on the page will have a font-size of 20px
```
