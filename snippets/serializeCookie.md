---
title: Serialize cookie
tags: browser,string
cover: blog_images/three-vases.jpg
firstSeen: 2018-01-13T14:19:21+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
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
