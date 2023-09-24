---
title: Resolve promise after given amount of time
type: snippet
language: javascript
tags: [function,promise]
author: chalarangelo
cover: filter-coffee-pot
dateModified: 2022-01-08
---

Creates a promise that resolves after a given amount of time to the provided value.

- Use the `Promise` constructor to create a new promise.
- Use `setTimeout()` to call the promise's `resolve` function with the passed `value` after the specified `delay`.

```js
const resolveAfter = (value, delay) =>
  new Promise(resolve => {
    setTimeout(() => resolve(value, delay));
  });
```

```js
resolveAfter('Hello', 1000);
// Returns a promise that resolves to 'Hello' after 1s
```
