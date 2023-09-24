---
title: Stream is readable
type: snippet
language: javascript
tags: [node,type]
cover: working-bee
dateModified: 2020-10-20
---

Checks if the given argument is a readable stream.

- Check if the value is different from `null`.
- Use `typeof` to check if the value is of type `object` and the `pipe` property is of type `function`.
- Additionally check if the `typeof` the `_read` and `_readableState` properties are `function` and `object` respectively.

```js
const isReadableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object';
```

```js
const fs = require('fs');

isReadableStream(fs.createReadStream('test.txt')); // true
```
