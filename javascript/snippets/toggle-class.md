---
title: Toggle class of HTML element
type: snippet
tags: [browser]
cover: laptop-plants-2
dateModified: 2020-10-22T20:24:30+03:00
---

Toggles a class for an HTML element.

- Use `Element.classList` and `DOMTokenList.toggle()` to toggle the specified class for the element.

```js
const toggleClass = (el, className) => el.classList.toggle(className);
```

```js
toggleClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```
