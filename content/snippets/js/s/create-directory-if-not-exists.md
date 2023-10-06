---
title: Create directory if not exists
type: snippet
language: javascript
tags: [node]
cover: misty-mountains
dateModified: 2020-10-22
---

Creates a directory, if it does not exist.

- Use `fs.existsSync()` to check if the directory exists, `fs.mkdirSync()` to create it.

```js
import { existsSync, mkdirSync } from 'fs';

const createDirIfNotExists = dir =>
  !existsSync(dir) ? mkdirSync(dir) : undefined;
```

```js
createDirIfNotExists('test');
// creates the directory 'test', if it doesn't exist
```
