---
title: Encode string to Base64
type: snippet
language: javascript
tags: [node,string]
cover: laptop-journey
dateModified: 2020-09-15
---

Creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.

- Create a `Buffer` for the given string with binary encoding.
- Use `Buffer.prototype.toString()` to return the base-64 encoded string.

```js
const btoa = str => Buffer.from(str, 'binary').toString('base64');
```

```js
btoa('foobar'); // 'Zm9vYmFy'
```
