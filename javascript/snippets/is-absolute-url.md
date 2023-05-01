---
title: Check if absolute URL
type: snippet
tags: [string,browser,regexp]
cover: coffee-phone-tray-2
dateModified: 2020-10-20T23:02:01+03:00
---

Checks if the given string is an absolute URL.

- Use `RegExp.prototype.test()` to test if the string is an absolute URL.

```js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);
```

```js
isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
```
