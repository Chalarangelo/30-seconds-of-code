---
title: Stream is writable
type: snippet
language: javascript
tags: [node,type]
cover: digital-nomad-3
dateModified: 2020-10-20
---

Checks if the given argument is a writable stream.

- Check if the value is different from `null`.
- Use `typeof` to check if the value is of type `object` and the `pipe` property is of type `function`.
- Additionally check if the `typeof` the `_write` and `_writableState` properties are `function` and `object` respectively.

```js
const isWritableStream = val =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object';
```

```js
import { createWriteStream } from 'fs';

isWritableStream(createWriteStream('test.txt')); // true
```
