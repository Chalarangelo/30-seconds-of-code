---
title: Serialize cookie
type: snippet
tags: [browser,string]
cover: three-vases
dateModified: 2020-10-22T20:24:30+03:00
---

Serializes a cookie name-value pair into a Set-Cookie header string.

- Use template literals and `encodeURIComponent()` to create the appropriate string.

```js
const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
```

```js
serializeCookie('foo', 'bar'); // 'foo=bar'
```
