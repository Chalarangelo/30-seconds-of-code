---
title: Element contains another element
type: snippet
tags: [browser]
cover: red-petals
dateModified: 2020-11-03T22:11:18+02:00
---

Checks if the `parent` element contains the `child` element.

- Check that `parent` is not the same element as `child`.
- Use `Node.contains()` to check if the `parent` element contains the `child` element.

```js
const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);
```

```js
elementContains(
  document.querySelector('head'),
  document.querySelector('title')
);
// true
elementContains(document.querySelector('body'), document.querySelector('body'));
// false
```
