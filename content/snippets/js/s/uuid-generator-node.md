---
title: Generate UUID (Node.js)
type: snippet
language: javascript
tags: [node,random]
cover: digital-nomad-7
dateModified: 2022-03-14
---

Generates a UUID in Node.JS.

- Use `crypto.randomBytes()` to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.
- Use `Number.prototype.toString()` to convert it to a proper UUID (hexadecimal string).
- [`crypto.randomUUID()`](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) provides similar functionality.

```js
const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
```

```js
UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'
```
