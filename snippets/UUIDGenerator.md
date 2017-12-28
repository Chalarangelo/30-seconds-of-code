### UUIDGenerator

Generates a UUID.

Use `crypto` API to generate a UUID, compliant with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) version 4.

Please note that this version will only work in **Node.JS** environments!

```js
const crypto = require("crypto");

const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );
```

If you'd like a dependency-less UUID Generator that will work in both browsers and Node.JS, you should choose this one instead.

```js
const UUIDGenerator2 = a =>
	a ? ((a ^ Math.random() * 16) >> a / 4).toString(16) :
		([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, UUIDGenerator2);
```

```js
UUIDGenerator();  // '7982fcfe-5721-4632-bede-6000885be57d'
UUIDGenerator2(); // '777c85e1-6fdf-47f4-8c65-2842487453bb'
```
