---
title: Array without last element
type: snippet
tags: [array]
cover: red-light
dateModified: 2020-11-03T21:46:13+02:00
---

Returns all the elements of an array except the last one.

- Use `Array.prototype.slice()` to return all but the last element of the array.

```js
const initial = arr => arr.slice(0, -1);
```

```js
initial([1, 2, 3]); // [1, 2]
```
