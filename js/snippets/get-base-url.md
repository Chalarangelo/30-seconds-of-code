---
title: Get base URL
type: snippet
tags: [string,browser,regexp]
author: chalarangelo
cover: compass
dateModified: 2021-01-03T20:32:13+02:00
---

Gets the current URL without any parameters or fragment identifiers.

- Use `String.prototype.replace()` with an appropriate regular expression to remove everything after either `'?'` or `'#'`, if found.

```js
const getBaseURL = url => url.replace(/[?#].*$/, '');
```

```js
getBaseURL('http://url.com/page?name=Adam&surname=Smith');
// 'http://url.com/page'
```
