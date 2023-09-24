---
title: Test if all array elements are falsy
type: snippet
language: javascript
tags: [array]
cover: little-white-flowers
dateModified: 2020-10-21
---

Checks if the provided predicate function returns `false` for all elements in a collection.

- Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const none = (arr, fn = Boolean) => !arr.some(fn);
```

```js
none([0, 1, 3, 0], x => x == 2); // true
none([0, 0, 0]); // true
```
