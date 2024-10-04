---
title: Offset elements in a JavaScript array
shortTitle: Offset array elements
language: javascript
tags: [array]
cover: interior-10
excerpt: Ever needed to move some elements to the end of an array? Here's a simple way to do it.
listed: true
dateModified: 2024-08-09
---

Have you ever needed to **move some elements to the end of an array?** While this sounds a little complicated, it's actually pretty simple.

As we generally **avoid mutating arrays directly**, we can create a new array with the elements moved to the end. This can be done by using `Array.prototype.slice()` to extract the elements before and after the specified index, and then combining them using the spread operator (`...`).

```js
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];

offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]
```

Note that if the `offset` is **negative**, the elements will be moved from the end to the start of the array.
