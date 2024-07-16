---
title: Check if absolute URL
type: snippet
language: javascript
tags: [string,browser,regexp]
cover: coffee-phone-tray-2
excerpt: Checks if the given string is an absolute URL.
listed: true
dateModified: 2020-10-20
---

Checks if the given string is an absolute URL.

- Use `RegExp.prototype.test()` to test if the string is an absolute URL.

```js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
```
