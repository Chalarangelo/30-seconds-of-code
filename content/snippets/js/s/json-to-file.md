---
title: JSON to file
type: snippet
language: javascript
tags: [node]
cover: travel-mug-3
dateModified: 2020-10-20
---

Writes a JSON object to a file.

- Use `fs.writeFileSync()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
import { writeFileSync } from 'fs';

const JSONToFile = (obj, filename) =>
  writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
```

```js
JSONToFile({ test: 'is passed' }, 'testJsonFile');
// writes the object to 'testJsonFile.json'
```
