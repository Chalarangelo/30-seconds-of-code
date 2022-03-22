---
title: Check if sessionStorage is enabled
tags: browser
expertise: intermediate
author: chalarangelo
firstSeen: 2020-12-31T13:13:47+02:00
lastUpdated: 2020-12-31T13:13:47+02:00
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
