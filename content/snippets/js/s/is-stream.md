---
title: Value is stream
type: snippet
language: javascript
tags: [node,type]
cover: mountain-lake-cottage-2
dateModified: 2020-10-20
---

Checks if the given argument is a stream.

- Check if the value is different from `null`.
- Use `typeof` to check if the value is of type `object` and the `pipe` property is of type `function`.

```js
const isStream = val =>
  val !== null && typeof val === 'object' && typeof val.pipe === 'function';
```

```js
import { createReadStream } from 'fs';

isStream(createReadStream('test.txt')); // true
```
