---
title: Join URL segments
type: snippet
tags: [string,regexp]
cover: digital-nomad-2
dateModified: 2020-10-22T20:24:44+03:00
---

Joins all given URL segments together, then normalizes the resulting URL.

- Use `Array.prototype.join()` to combine URL segments.
- Use a series of `String.prototype.replace()` calls with various regular expressions to normalize the resulting URL (remove double slashes, add proper slashes for protocol, remove slashes before parameters, combine parameters with `'&'` and normalize first parameter delimiter).

```js
const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');
```

```js
URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo');
// 'http://www.google.com/a/b/cd?foo=123&bar=foo'
```
