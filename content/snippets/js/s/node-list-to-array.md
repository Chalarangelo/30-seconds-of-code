---
title: Convert a NodeList to a JavaScript array
shortTitle: NodeList to array
language: javascript
tags: [browser,array]
cover: compass-2
excerpt: Ever needed to convert a `NodeList` to an array in JavaScript? Here's the fastest way to do so.
listed: true
dateModified: 2024-03-21
---

If you've ever worked with `NodeList` objects in JavaScript, you might have noticed that they don't have all the array methods available. Seeing as they come up often when **querying the DOM**, for example using `Document.querySelectorAll()`, it's useful to know how to convert them to arrays.

Luckily, as `NodeList` objects are **array-like**, you can easily convert them to arrays using the spread operator (`...`). This will allow you to use **all the array methods** you're used to.

```js
const nodeListToArray = nodeList => [...nodeList];

const nodes = document.childNodes;
// NodeList [ <!DOCTYPE html>, html ]
const nodesArray = nodeListToArray(nodes);
// [ <!DOCTYPE html>, html ]
nodesArray.join(', ');
// '[object DocumentType], [object HTMLHtmlElement]'
```
