---
title: Hide elements
type: snippet
tags: [browser,css]
cover: book-chair
dateModified: 2020-09-15T16:28:04+03:00
---

Hides all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

```js
hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
```
