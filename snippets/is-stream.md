---
title: Value is stream
tags: node,type
cover: mountain-lake-cottage-2
firstSeen: 2018-10-01T20:12:19+03:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the given argument is a stream.

- Check if the value is different from `null`.
- Use `typeof` to check if the value is of type `object` and the `pipe` property is of type `function`.

```js
const isStream = val =>
  val !== null && typeof val === 'object' && typeof val.pipe === 'function';
```

```js
const fs = require('fs');

isStream(fs.createReadStream('test.txt')); // true
```
