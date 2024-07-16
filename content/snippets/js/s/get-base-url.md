---
title: Get base URL
type: snippet
language: javascript
tags: [string,browser,regexp]
cover: blue-lake
listed: true
dateModified: 2021-01-03
---

Gets the current URL without any parameters or fragment identifiers.

- Use `String.prototype.replace()` with an appropriate regular expression to remove everything after either `'?'` or `'#'`, if found.

```js
const getBaseURL = url => url.replace(/[?#].*$/, '');

getBaseURL('http://url.com/page?name=Adam&surname=Smith');
// 'http://url.com/page'
```
