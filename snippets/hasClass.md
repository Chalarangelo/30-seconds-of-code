---
title: Check if HTML element has class
tags: browser,css
expertise: beginner
firstSeen: 2017-12-28T23:46:33+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Checks if the given element has the specified class.

- Use `Element.classList` and `DOMTokenList.contains()` to check if the element has the specified class.

```js
const hasClass = (el, className) => el.classList.contains(className);
```

```js
hasClass(document.querySelector('p.special'), 'special'); // true
```
