---
title: elementContains
tags: browser,intermediate
---

Returns `true` if the `parent` element contains the `child` element, `false` otherwise.

Check that `parent` is not the same element as `child`, use `parent.contains(child)` to check if the `parent` element contains the `child` element.

```js
const elementContains = (parent, child) => parent !== child && parent.contains(child);
```

```js
elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```