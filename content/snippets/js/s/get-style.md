---
title: Get style for element
type: snippet
language: javascript
tags: [browser,css]
cover: frog-blue-flower
dateModified: 2020-10-19
---

Retrieves the value of a CSS rule for the specified element.

- Use `Window.getComputedStyle()` to get the value of the CSS rule for the specified element.

```js
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

```js
getStyle(document.querySelector('p'), 'font-size'); // '16px'
```
