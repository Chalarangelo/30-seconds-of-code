---
title: Check if localStorage or sessionStorage is enabled
shortTitle: LocalStorage or sessionStorage enabled
language: javascript
tags: [browser]
cover: guitar-living-room
excerpt: Check if `localStorage` or `sessionStorage` is enabled in the browser, using a simple JavaScript function.
listed: true
dateModified: 2024-01-12
---

Working with `localStorage` and `sessionStorage` often poses challenges, the most significant of which is that they are **not always available**. This may be due to the browser's security settings, or the user's privacy settings, or even the browser's version.

In any case, it is always a good idea to check if `localStorage` or `sessionStorage` is available before using it.

## Check if `localStorage` is enabled

Checking if `localStorage` is enabled requires some trial and error, quite literally, as we will use a `try...catch` block to test if operations in `localStorage` are supported.

Using `Storage.setItem()` and `Storage.removeItem()` we will **try to store and delete a value** in `localStorage`. If both operations complete successfully, we will return `true`, otherwise we will return `false`.

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

isLocalStorageEnabled(); // true, if localStorage is accessible
```

## Check if `sessionStorage` is enabled

Checking if `sessionStorage` is enabled is the exact same as checking if `localStorage` is enabled, except that we will use `sessionStorage` instead of `localStorage`.

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

isSessionStorageEnabled(); // true, if sessionStorage is accessible
```

> [!TIP]
>
> You can learn about the differences between `localStorage` and `sessionStorage` in [a previous article](/js/s/cookies-local-storage-session).
