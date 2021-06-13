---
title: btoa
tags: node,string,beginner
firstSeen: 2018-01-17T21:43:21+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.

- Create a `Buffer` for the given string with binary encoding and use `Buffer.toString('base64')` to return the encoded string.

```js
const btoa = str => Buffer.from(str, 'binary').toString('base64');
```

```js
btoa('foobar'); // 'Zm9vYmFy'
```
