---
title: NodeList to array
type: snippet
language: javascript
tags: [browser,array]
cover: compass-2
dateModified: 2020-10-21
---

Converts a `NodeList` to an array.

- Use spread operator (`...`) inside new array to convert a `NodeList` to an array.

```js
const nodeListToArray = nodeList => [...nodeList];
```

```js
nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]
```
