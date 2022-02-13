---
title: Get style for element
tags: browser,css,beginner
firstSeen: 2017-12-29T00:08:17+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Retrieves the value of a CSS rule for the specified element.

- Use `Window.getComputedStyle()` to get the value of the CSS rule for the specified element.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

```js
getStyle(document.querySelector('p'), 'font-size'); // '16px'
```
