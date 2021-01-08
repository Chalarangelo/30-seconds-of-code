---
title: storage
tags: localstorage, intermediate
---

Set and get objects or string to browser's localstorage

- If only key is passed then it grab data from localstorage.
- If both key and value passed then it stores data in localstorage.
- Use `JSON.parse()` to convert JSON string stored in localstorage into object.
- Use `JSON.stringify()` to convert object into JSON string to store in localstorage.
- Use `window.localstorage.setItem()` & `window.localstorage.getItem()` to deal with localstorage.
- Use `typeof` to detect if given value is object or not.

```js
const storage = (key, value = null) => {
  if (value !== null) {
    if (typeof value === "object") {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  } else {
    let x = null;
    try {
      x = window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
    if (x !== null) {
      try {
        return JSON.parse(x);
      } catch (e) {
        return x;
      }
    }
  }
};
```

```js
storage("myKey", { key1: "MyValue_1", key2: "MyValue_2" }); // true if supported, false if not supported
storage("myKey"); // Object { key1: "MyValue_1", key2: "MyValue_2" }
```
