---
title: Get nested object property from path string
type: snippet
tags: [object,regexp]
cover: brown-bird
dateModified: 2020-10-19T22:49:51+03:00
---

Retrieves a set of properties indicated by the given selectors from an object.

- Use `Array.prototype.map()` for each selector, `String.prototype.replace()` to replace square brackets with dots.
- Use `String.prototype.split()` to split each selector.
- Use `Array.prototype.filter()` to remove empty values and `Array.prototype.reduce()` to get the value indicated by each selector.

```js
const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );
```

```js
const obj = {
  selector: { to: { val: 'val to select' } },
  target: [1, 2, { a: 'test' }],
};
get(obj, 'selector.to.val', 'target[0]', 'target[2].a');
// ['val to select', 1, 'test']
```
