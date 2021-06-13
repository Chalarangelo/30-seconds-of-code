---
title: nodeListToArray
tags: browser,array,beginner
firstSeen: 2018-05-06T18:11:21+03:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Converts a `NodeList` to an array.

- Use spread operator (`...`) inside new array to convert a `NodeList` to an array.

```js
const nodeListToArray = nodeList => [...nodeList];
```

```js
nodeListToArray(document.childNodes); // [ <!DOCTYPE html>, html ]
```
