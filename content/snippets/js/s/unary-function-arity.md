---
title: Unary function arity
type: snippet
language: javascript
tags: [function]
cover: flower-portrait-2
dateModified: 2020-10-22
---

Creates a function that accepts up to one argument, ignoring any additional arguments.

- Call the provided function, `fn`, with just the first argument supplied.

```js
const unary = fn => val => fn(val);
```

```js
['6', '8', '10'].map(unary(parseInt)); // [6, 8, 10]
```
