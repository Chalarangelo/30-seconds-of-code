---
title: Decode Base64 encoded string
type: snippet
tags: [node,string]
cover: thread
dateModified: 2020-09-15T16:28:04+03:00
---

Decodes a string of data which has been encoded using base-64 encoding.

- Create a `Buffer` for the given string with base-64 encoding.
- Use `Buffer.prototype.toString()` to return the decoded string.

```js
const atob = str => Buffer.from(str, 'base64').toString('binary');
```

```js
atob('Zm9vYmFy'); // 'foobar'
```
