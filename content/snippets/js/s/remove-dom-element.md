---
title: Remove an element from the DOM using JavaScript
shortTitle: Remove DOM element
language: javascript
tags: [browser]
cover: by-the-lighthouse
excerpt: Learn how to quickly remove an element from the DOM using JavaScript.
listed: true
dateModified: 2024-07-04
---

DOM manipulation is one of the primary reasons JavaScript even exists. That being said, removing an element from the DOM is one of the most common tasks you'll encounter.

While it sounds simple, you can't simply ask an element to remove itself. Instead, you need to access its **parent node** and **remove the element** from there. To do so, you'll have to use the `Node.parentNode` property to get the parent node and then call `Node.removeChild()` to remove the element from the parent node.

```js
const removeElement = el => el.parentNode.removeChild(el);

removeElement(document.querySelector('#my-element'));
// Removes #my-element from the DOM
```
