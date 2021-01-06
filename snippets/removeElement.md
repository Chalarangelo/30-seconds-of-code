---
title: removeElement
tags: browser,beginner
---

Removes an element from the DOM.

- Use `Element.parentNode` to get the given element's parent node.
- Use `Element.removeChild()` to remove the given element from its parent node.

```js
const removeElement = el => el.parentNode.removeChild(el);
```

```js
removeElement(document.querySelector('#my-element'));
// Removes #my-element from the DOM
```
