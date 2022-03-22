---
title: Array of element's siblings
tags: browser
expertise: intermediate
author: chalarangelo
firstSeen: 2020-08-07T15:31:48+03:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Returns an array containing all the siblings of the given element.

- Use `Node.parentNode` and `Node.childNodes` to get a `NodeList` of all the elements contained in the element's parent.
- Use the spread operator (`...`) and `Array.prototype.filter()` to convert to an array and remove the given element from it.

```js
const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);
```

```js
getSiblings(document.querySelector('head')); // ['body']
```
