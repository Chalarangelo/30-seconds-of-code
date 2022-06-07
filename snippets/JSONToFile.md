---
title: JSON to file
tags: node
expertise: intermediate
cover: blog_images/travel-mug-3.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Writes a JSON object to a file.

- Use `fs.writeFileSync()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require('fs');

const JSONToFile = (obj, filename) =>
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
```

```js
JSONToFile({ test: 'is passed' }, 'testJsonFile');
// writes the object to 'testJsonFile.json'
```
