---
title: How can I save a JSON object to a file using JavaScript?
shortTitle: JSON to file
language: javascript
tags: [node, browser]
cover: travel-mug-3
excerpt: Learn how to write a JSON object to a file, both using Node.js and in the browser.
listed: true
dateModified: 2024-02-01
---

JSON objects are a common way to **store and exchange data**. It's often useful to save a JSON object to a file, either in a Node.js environment or in the browser. Luckily, neither one is particularly difficult.

## Save a JSON object to a file in Node.js

Node.js provides a **built-in module** called `fs` that allows you to work with the file system. You can use the `fs.writeFileSync()` method to write a JSON object to a file. To convert the JSON object to a string, you can use `JSON.stringify()`. Finally, you should specify the **file extension** as `.json`.

```js
import { writeFileSync } from 'fs';

const JSONToFile = (obj, filename) =>
  writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));

JSONToFile({ test: 'is passed' }, 'testJsonFile');
// writes the object to 'testJsonFile.json'
```

## Save a JSON object to a file in the browser

In the browser, you can use the `Blob` and `URL.createObjectURL()` to create a **downloadable file**. You can the use `Document.createElement()` to create an **anchor element** (`a`), set its `href` and `download` attributes, and then trigger a **click event** to download the file.

```js
const JSONToFile = (obj, filename) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

JSONToFile({ test: 'is passed' }, 'testJsonFile');
// downloads the object as 'testJsonFile.json'
```
