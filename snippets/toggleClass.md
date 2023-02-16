---
title: Toggle class of HTML element
tags: browser
cover: laptop-plants-2
firstSeen: 2017-12-28T23:46:33+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
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
