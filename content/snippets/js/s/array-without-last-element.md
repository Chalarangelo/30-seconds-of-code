---
title: Array without last element
type: snippet
language: javascript
tags: [array]
cover: red-light
dateModified: 2020-11-03
---

Returns all the elements of an array except the last one.

- Use `Array.prototype.slice()` to return all but the last element of the array.

```js
const initial = arr => arr.slice(0, -1);
```

```js
initial([1, 2, 3]); // [1, 2]
```
