---
title: Show elements
type: snippet
language: javascript
tags: [browser,css]
cover: orange-coffee-3
dateModified: 2020-10-22T20:24:30+03:00
---

Shows all the elements specified.

- Use the spread operator (`...`) and `Array.prototype.forEach()` to clear the `display` property for each element specified.

```js
const show = (...el) => [...el].forEach(e => (e.style.display = ''));
```

```js
show(...document.querySelectorAll('img'));
// Shows all <img> elements on the page
```
