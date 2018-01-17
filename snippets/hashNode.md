### functionName

Creates a hash for a value using the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm.

Use `crypto` API to create a hash for the given value.

```js
const crypto = require('crypto');
const hashNode = val => crypto.createHash('sha256').update(val).digest('hex');
```

```js
hashNode(JSON.stringify({a :'a', b: [1,2,3,4], 'foo': {c: 'bar'}})); // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
```
