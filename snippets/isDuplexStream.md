---
title: isDuplexStream
tags: node,type,intermediate
---

Checks if the given argument is a duplex (readable and writable) stream.

- Check if the value is different from `null`.
- Use `typeof` to check if a value is of type `object` and the `pipe` property is of type `function`.
- Additionally check if the `typeof` the `_read`, `_write` and `_readableState`, `_writableState` properties are `function` and `object` respectively.

```js
const isDuplexStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';
```

```js
const Stream = require('stream');

isDuplexStream(new Stream.Duplex()); // true
```
