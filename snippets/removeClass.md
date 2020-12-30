---
title: removeClass
tags: browser,beginner
---

Removes a class from an HTML element.

- Use `Element.classList` and `DOMTokenList.remove()` to remove the specified class from the element.

```js
const removeClass = (el, className) => el.classList.remove(className);
```

```js
removeClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore
```
