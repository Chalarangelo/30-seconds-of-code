---
title: Stream is writable
tags: node,type
cover: blog_images/digital-nomad-3.jpg
firstSeen: 2018-10-03T22:16:10+03:00
lastUpdated: 2020-10-20T23:02:01+03:00
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
const fs = require('fs');

isWritableStream(fs.createWriteStream('test.txt')); // true
```
