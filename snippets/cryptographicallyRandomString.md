---
title: cryptographicallyRandomString
tags: browser,random,advanced
firstSeen: 2021-10-19T05:00:00-04:00
---

Generates a cryptographically random string with a given length.

- Uses `window.crypto.getRandomValues` to get an array of random `Uint8` values.
- Translates the `Uint8Array` to a string using modulo.

```js
const charset =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/';

const cryptographicallyRandomString = (length) => {
  const randoms = new Uint8Array(length);
  window.crypto.getRandomValues(randoms);

  let result = '';
  randoms.forEach((random) => {
    result += charset.charAt(random % charset.length);
  });
  return result;
};
```

```js
cryptographicallyRandomString(10); // '6LhAQSUTVo'
```
