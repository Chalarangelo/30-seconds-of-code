---
title: Read file lines
type: snippet
language: javascript
tags: [node]
cover: solitude-beach
dateModified: 2020-10-22
---

Returns an array of lines from the specified file.

- Use `fs.readFileSync()` to create a `Buffer` from a file.
- Use `Buffer.prototype.toString()` to covert the buffer to a string.
- Use `String.prototype.split()` to create an array of lines from the contents of the file.

```js
import { readFileSync } from 'fs';

const readFileLines = filename =>
  readFileSync(filename).toString('UTF8').split('\n');
```

```js
/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']
```
