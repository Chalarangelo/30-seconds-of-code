# gud

> Create a 'gud nuff' (not cryptographically secure) globally unique id

## Install

```
yarn add gud
```

## Usage

```js
const gud = require('gud');

console.log(gud()); // 1
console.log(gud()); // 2
```

This is ever so slightly better than using something like `_.uniqueId` because
it will work across multiple copies of the same module.

Do not use this in place of actual UUIDs, security folks will hate me.

This will not be unique across processes/workers.
