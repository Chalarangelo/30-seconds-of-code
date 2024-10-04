---
title: Generate a UUID in JavaScript
shortTitle: Generate UUID
language: javascript
tags: [browser,node,random]
cover: digital-nomad-7
excerpt: Generate a UUID in JavaScript using native APIs in both the browser and Node.js.
listed: true
dateModified: 2023-12-27
---

A [Universally Unique Identifier (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. It has been standardized by [RFC 4122](https://tools.ietf.org/html/rfc4122).

As browsers and Node.js have historically had some differences in their APIs, you should be aware of the **runtime environment** when generating a UUID. Let's dive into your options and when to use them.

> [!IMPORTANT]
>
> All implementations below are, to the best of my knowledge, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

## Latest browsers & Node.js versions

Generating a UUID in a modern browser or Node.js is very straightforward. As the **Crypto API** has been standardized you can use the `crypto.randomUUID()` method to generate a UUID.

```js [Browser]
crypto.randomUUID(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

```js [Node.js]
import { randomUUID } from 'crypto';

randomUUID(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

## Older environments

In older environments, generating a UUID is a more complex task. While the technique described below is going to be **less relevant** as time goes by, I think it's still worth documenting.

> [!NOTE]
>
> This technique is the same for both browsers and Node.js. However, in Node.js versions prior to **v17.4.0**, you need to use [`crypto.randomBytes()`](https://nodejs.org/api/crypto.html#cryptorandombytessize-callback) instead of `crypto.getRandomValues()`.

If `crypto.randomUUID()` is not an option, `crypto.getRandomValues()` should still be available. This method allows you to generate **cryptographically strong pseudo-random data**. It accepts a `TypedArray` as an argument and fills it with random values.

Start by creating a string that represents a UUID **template**: `([1e7] + -1e3 + -4e3 + -8e3 + -1e11)`. This string contains **placeholders** (the numbers `0`, `1`, and `8`) that will be replaced with random hexadecimal digits.

Then, using `String.prototype.replace()`, replace the placeholders with the **random hexadecimal digits** that we generate using `crypto.getRandomValues()`. For each matching placeholder, use the **bitwise XOR** operator (`^`) and the **right shift** (`>>`) by the result of `c / 4` (where `c` is the placeholder). This will result in a random hexadecimal digit. Finally, use `Number.prototype.toString()` with a radix of `16` to convert the value to a hexadecimal string.

```js
const generateUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

generateUUID(); // '7982fcfe-5721-4632-bede-6000885be57d'
```
