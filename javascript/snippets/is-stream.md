---
title: Value is stream
type: snippet
tags: [node,type]
cover: mountain-lake-cottage-2
dateModified: 2020-10-20T23:02:01+03:00
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
