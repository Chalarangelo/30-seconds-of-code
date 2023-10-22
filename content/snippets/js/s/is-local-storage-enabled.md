---
title: Check if localStorage is enabled
type: snippet
language: javascript
tags: [browser]
cover: guitar-living-room
dateModified: 2020-12-31
---

Checks if `localStorage` is enabled.

- Use a `try...catch` block to return `true` if all operations complete successfully, `false` otherwise.
- Use `Storage.setItem()` and `Storage.removeItem()` to test storing and deleting a value in `Window.localStorage`.

```js
const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
```

```js
isLocalStorageEnabled(); // true, if localStorage is accessible
```
