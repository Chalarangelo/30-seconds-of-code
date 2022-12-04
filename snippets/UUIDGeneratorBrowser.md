---
title: Generate UUID (browser)
tags: browser,random
cover: blog_images/mountain-lake-cottage.jpg
firstSeen: 2017-12-29T09:47:10+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Generates a UUID in a browser.

- Use `Crypto.getRandomValues()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString()` to convert it to a proper UUID (hexadecimal string).

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
```

```js
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```
