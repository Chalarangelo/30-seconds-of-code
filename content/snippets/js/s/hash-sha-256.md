---
title: Calculate SHA-256 hash in JavaScript
shortTitle: SHA-256 hash
type: story
language: javascript
tags: [browser,node,promise]
cover: padlocks
excerpt: Calculate a SHA-256 hash in JavaScript using native APIs in both the browser and Node.js.
dateModified: 2023-10-07
---

The [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm is a widely used hash function producing a **256-bit hash value**. It is used in many security applications and protocols, including TLS and SSL, SSH, PGP, and Bitcoin.

Calculating a SHA-256 hash in JavaScript is easy using **native APIs**, but there are some differences between the browser and Node.js. As the browser implementation is asynchronous, both of the examples provided will return a `Promise` for consistency.

### Browser

In the browser, you can use the [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) API to create a hash for the given value. You first need to create a new `TextEncoder` and use it to encode the given value. Then, pass its value to `SubtleCrypto.digest()` to generate a digest of the given data, resulting in a `Promise`.

As the promise resolves to an `ArrayBuffer`, you will need to read the data using `DataView.prototype.getUint32()`. Then, you need to convert the data to its hexadecimal representation using `Number.prototype.toString()`. Add the data to an array using `Array.prototype.push()`. Finally, use `Array.prototype.join()` to combine values in the array of `hexes` into a string.

```js
const hashValue = val =>
  crypto.subtle
    .digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

hashValue(
  JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })
).then(console.log);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

### Node.js

In Node.js, you can use the `crypto` module to create a hash for the given value. You first need to create a `Hash` object with the appropriate algorithm using `crypto.createHash()`. Then, use `hash.update()` to add the data from `val` to the `Hash` and `hash.digest()` to calculate the digest of the data.

For consistency with the browser implementation and to prevent blocking on a long operation, we'll return a `Promise` by wrapping it in `setTimeout()`.

```js
import { createHash } from 'crypto';

const hashValue = val =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(createHash('sha256').update(val).digest('hex')),
      0
    )
  );

hashValue(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(
  console.log
);
// '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```

### Notes

- The two implementations are **not compatible** with each other. You cannot use the browser implementation in Node.js and vice versa.
- Both implementations should produce the same result for the same input.
