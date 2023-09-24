---
title: Serialize cookie
type: snippet
language: javascript
tags: [browser,string]
cover: three-vases
dateModified: 2020-10-22
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
