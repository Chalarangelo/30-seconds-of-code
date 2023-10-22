---
title: Check if sessionStorage is enabled
type: snippet
language: javascript
tags: [browser]
cover: flower-camera
dateModified: 2020-12-31
---

Checks if `sessionStorage` is enabled.

- Use a `try...catch` block to return `true` if all operations complete successfully, `false` otherwise.
- Use `Storage.setItem()` and `Storage.removeItem()` to test storing and deleting a value in `Window.sessionStorage`.

```js
const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
```

```js
isSessionStorageEnabled(); // true, if sessionStorage is accessible
```
