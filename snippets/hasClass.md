---
title: hasClass
tags: browser,css,beginner
---

Returns `true` if the element has the specified class, `false` otherwise.

- Use `element.classList.contains()` to check if the element has the specified class.

```js
const hasClass = (el, className) => el.classList.contains(className);
```

```js
hasClass(document.querySelector('p.special'), 'special'); // true
```
