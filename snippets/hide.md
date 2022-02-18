---
title: Hide elements
tags: browser,css,beginner
firstSeen: 2017-12-28T23:33:21+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Hides all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to apply `display: none` to each element specified.

```js
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

```js
hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
```
