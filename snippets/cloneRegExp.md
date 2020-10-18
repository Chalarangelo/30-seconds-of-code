---
title: cloneRegExp
tags: type,regexp,intermediate
---

Clones a regular expression.

- Use `new RegExp()`, `RegExp.source` and `RegExp.flags` to clone the given regular expression.

```js
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
```

```js
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2
```
