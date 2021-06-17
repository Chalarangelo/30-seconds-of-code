---
title: findClosestMatchingNode
tags: browser,intermediate
firstSeen: 2021-04-22T08:45:39+03:00
lastUpdated: 2021-04-22T08:45:39+03:00
---

Finds the closest matching node starting at the given `node`.

- Use a `for` loop and `Node.parentNode` to traverse the node tree upwards from the given `node`.
- Use `Element.matches()` to check if any given element node matches the provided `selector`.
- If no matching node is found, return `null`.

```js
const findClosestMatchingNode = (node, selector) => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.matches && n.matches(selector)) return n;
  return null;
};
```

```js
findClosestMatchingNode(document.querySelector('span'), 'body'); // body
```
