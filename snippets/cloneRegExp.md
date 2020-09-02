---
title: cloneRegExp
tags: type,string,regexp,intermediate
---

Clones a regular expression.

Use `new RegExp()`, `RegExp.source` and `RegExp.flags` to clone the given regular expression.

```js
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
```

```js
cloneRegExp(/lorem ipsum/gi); // /lorem ipsum/gi
```
