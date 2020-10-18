---
title: removeDupsFromArray
tags: array,beginner
---

Removes duplicate strings from an array

- Uses the Set implementation of JS to accomplish this

```js
const removeDupsFromArray = arr => [...new Set(arr)];
```

```js
removeDupsFromArray(['Hello','Hello','World','World','!','!','!']); // ["Hello", "World", "!"]
```