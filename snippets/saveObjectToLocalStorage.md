---
title: saveObjectToLocalStorage
tags: localstorage,object,beginner
---

Save the object in the localstorage of the browser.

- Convert object to string using `JSON.stringify()`.
- Save data to localstorage using `Storage.prototype.setItem()`.

```js
const saveObjectToLocalStorage = (key,obj) => localStorage.setItem(key,JSON.stringify(obj));
```

```js
saveObjectToLocalStorage('myKey',{website:'30secondsofcode.org'}); // Will store the object with  myKey in localstorage 
```
