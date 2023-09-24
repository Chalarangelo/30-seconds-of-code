---
title: Hide elements
type: snippet
language: javascript
tags: [browser,css]
cover: picking-berries
dateModified: 2020-09-15
---

Hides all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

```js
hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
```
