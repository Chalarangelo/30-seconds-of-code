---
title: Clone RegExp
type: snippet
tags: [type]
cover: tomatoes
dateModified: 2020-10-22T20:23:47+03:00
---

Clones a regular expression.

- Use the `RegExp` constructor, `RegExp.prototype.source` and `RegExp.prototype.flags` to clone the given regular expression.

```js
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
```

```js
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2
```
