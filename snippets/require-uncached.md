---
title: Uncached module require
type: snippet
tags: [node]
author: chalarangelo
cover: curve
dateModified: 2020-09-15T16:28:04+03:00
---

Loads a module after removing it from the cache (if exists).

- Use `delete` to remove the module from the cache (if exists).
- Use `require()` to load the module again.

```js
const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};
```

```js
const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time
```
