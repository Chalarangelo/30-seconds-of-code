---
title: Check if two URLs are on the same origin
shortTitle: Same origin URL check
language: javascript
tags: [browser]
cover: leafy-screens
excerpt: Can you tell if two URLs are on the same origin? Here's a very simple way to do so.
listed: true
dateModified: 2024-07-08
---

Two URLs are considered to be on the **same origin** if they have the **same protocol, host, and port**. This is an important concept in web security, as it determines whether a web page can access resources from another page.

In order to determine if two URLs are on the same origin, we can easily use `URL.protocol`, `URL.host`, and `URL.port` to compare the properties of the two URLs. If **all three properties match**, the URLs are on the same origin. Otherwise, they are not.

```js
const isSameOrigin = (origin, destination) =>
  origin.protocol === destination.protocol && origin.host === destination.host && origin.port === destination.port;

const origin = new URL('https://www.30secondsofcode.org/about');
const destination = new URL('https://www.30secondsofcode.org/contact');
isSameOrigin(origin, destination); // true
const other = new URL('https://developer.mozilla.org');
isSameOrigin(origin, other); // false
```
