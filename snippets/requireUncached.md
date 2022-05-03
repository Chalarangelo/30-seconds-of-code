---
title: Uncached module require
tags: node
expertise: advanced
author: chalarangelo
cover: blog_images/curve.jpg
firstSeen: 2020-08-07T15:49:39+03:00
lastUpdated: 2020-09-15T16:28:04+03:00
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
