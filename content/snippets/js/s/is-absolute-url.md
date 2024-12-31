---
title: Check if a URL is an absolute URL with JavaScript
shortTitle: Absolute URL check
language: javascript
tags: [string,browser,regexp]
cover: coffee-phone-tray-2
excerpt: Want to know if a string is an absolute URL? This article will help you out.
listed: true
dateModified: 2024-07-09
---

An **absolute URL** is a URL that includes a scheme (e.g. `https://`, `ftp://`, `mailto:`). This is in contrast to a **relative URL**, which doesn't include a scheme and is typically used to reference resources within the same domain.

Given that definition, we can easily write a **regular expression** to check if a string is an absolute URL. We can then use `RegExp.prototype.test()` to check if the string matches the pattern.

```js
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
```
