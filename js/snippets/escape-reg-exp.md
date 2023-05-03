---
title: Escape RegExp
type: snippet
tags: [string,regexp]
cover: frog-blue-flower
dateModified: 2020-09-15T16:28:04+03:00
---

Escapes a string to use in a regular expression.

- Use `String.prototype.replace()` to escape special characters.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
```

```js
escapeRegExp('(test)'); // \\(test\\)
```
