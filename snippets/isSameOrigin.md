---
title: Same-origin URLs
tags: object
expertise: beginner
author: chalarangelo
firstSeen: 2021-04-22T08:27:41+03:00
lastUpdated: 2021-04-22T08:27:41+03:00
---

Checks if two URLs are on the same origin.

- Use `URL.protocol` and `URL.host` to check if both URLs have the same protocol and host.

```js
const isSameOrigin = (origin, destination) =>
  origin.protocol === destination.protocol && origin.host === destination.host;
```

```js
const origin = new URL('https://www.30secondsofcode.org/about');
const destination = new URL('https://www.30secondsofcode.org/contact');
isSameOrigin(origin, destination); // true
const other = new URL('https://developer.mozilla.org);
isSameOrigin(origin, other); // false
```
