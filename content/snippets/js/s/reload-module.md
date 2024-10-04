---
title: Can I reload a module in Node.js?
shortTitle: Reload a module
language: javascript
tags: [node]
cover: tea-laptop-table
excerpt: Ever wanted to reload a module in Node.js? Here's how you can do it.
listed: true
dateModified: 2024-05-13
---

If you've ever tried to **reload a module** in Node.js, you might have noticed that it's not as straightforward as you might expect. **Node.js caches modules** after they are loaded, so subsequent `require()` calls return the cached module instead of loading it again. This can be useful for **performance** reasons, but it can also be a hindrance when you want to reload a module.

Luckily, the require cache can be accessed via `require.cache`, allowing you to manipulate it as needed. Simply using `delete`, you can **remove a module from the cache**, if it exists, allowing you to **load it fresh** the next time you call `require()`.

```js
const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

const fs = requireUncached('fs');
// 'fs' will be loaded fresh every time
```
