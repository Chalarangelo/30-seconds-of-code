---
title: Read a file and return an array of lines
shortTitle: Read file lines
language: javascript
tags: [node]
cover: solitude-beach
excerpt: Parse a text file and return an array of lines, synchronously or asynchronously, using Node.js.
listed: true
dateModified: 2024-05-20
---

Parsing **text files** is one of the most common tasks in programming. Luckily, Node.js provides simple ways to read files synchronously or asynchronously. Connecting the dots to convert the result into an array of lines is straightforward.

## Read a text file

**Reading** text files can be accomplished either using `fs.readFileSync()` or `fs.readFile()`. The former is **synchronous** and blocks the event loop, while the latter is **asynchronous** and non-blocking, returning a `Promise`.

Both methods return a `Buffer` object, which can be converted to a string using `Buffer.prototype.toString()`. Alternatively, you can specify the **encoding as the second argument** to return a string directly.

```js
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';

readFileSync('test.txt').toString('UTF8');
// 'line1\nline2\nline3\n'
readFile('test.txt', 'UTF8');
// 'line1\nline2\nline3\n'

readFile('test.txt').then(data => data.toString());
// Promise {'line1\nline2\nline3\n'}
readFile('test.txt', 'UTF8');
// Promise {'line1\nline2\nline3\n'}
```

## Read file and convert to an array of lines

To convert the contents of a file to an array of lines, you can use `String.prototype.split()` to **split the string by the newline character** (`\n`).

```js
const fileContents = 'line1\nline2\nline3\n';

fileContents.split('\n');
// ['line1', 'line2', 'line3']
```

### Read file lines asynchronously

Putting the pieces together, you can read a file **asynchronously** and return an array of lines. Make sure to handle the resulting `Promise` accordingly, using `await` or `Promise.prototype.then()`.

```js
import { readFile } from 'fs/promises';

const readFileLines = path =>
  readFile(path, 'UTF8').then(data => data.split('\n'));

readFileLines('test.txt').then(lines => console.log(lines));
// ['line1', 'line2', 'line3']
```

### Read file lines synchronously

If you prefer synchronous code, you can read the file **synchronously** and convert it to an array of lines. The resulting array can be used directly.

```js
import { readFileSync } from 'fs';

const readFileLinesSync = path =>
  readFileSync(path, 'UTF8').toString().split('\n');

const lines = readFileLinesSync('test.txt');
console.log(lines);
// ['line1', 'line2', 'line3']
```
