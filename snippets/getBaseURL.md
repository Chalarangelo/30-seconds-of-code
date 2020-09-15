---
title: getBaseURL
tags: browser,string,url,beginner
---

Returns the current URL without any parameters.

- Use `String.prototype.indexOf()` to check if the given `url` has parameters, `String.prototype.slice()` to remove them if necessary.

```js
const getBaseURL = url =>
  url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url;
```

```js
getBaseURL('http://url.com/page?name=Adam&surname=Smith'); // 'http://url.com/page'
```
