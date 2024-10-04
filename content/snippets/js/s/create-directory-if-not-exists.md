---
title: Create a directory if it doesn't exist using Node.js
shortTitle: Create directory if not exists
language: javascript
tags: [node]
cover: misty-mountains
excerpt: Learn how to create a directory using Node.js, if it doesn't exist.
listed: true
dateModified: 2024-03-08
---

When working with files and directories in Node.js, you might want to create a directory, if it doesn't exist yet. The default behavior of the filesystem methods in Node.js is to throw an error if the directory already exists, so you need to roll up your own solution for this task.

## Asynchronous approach

Most commonly, you'll want to create a directory asynchronously, using `fs.mkdir()`. This method returns a `Promise`, that will reject if the directory already exists. In order to remedy that, we can use `fs.access()` to check if the directory exists, and then create it if it doesn't.

```js
import { access, mkdir } from 'fs/promises';

const createDirIfNotExists = dir =>
  access(dir)
    .then(() => undefined)
    .catch(() => mkdir(dir));

createDirIfNotExists('test');
// Asynchronously creates the directory 'test', if it doesn't exist
```

## Synchronous approach

While the asynchronous approach is generally preferred, you might want to create a directory synchronously in some cases. You can use `fs.existsSync()` to check if the directory exists, and `fs.mkdirSync()` to create it.

```js
import { existsSync, mkdirSync } from 'fs';

const createDirIfNotExists = dir =>
  !existsSync(dir) ? mkdirSync(dir) : undefined;

createDirIfNotExists('test');
// Synchronously creates the directory 'test', if it doesn't exist
```
