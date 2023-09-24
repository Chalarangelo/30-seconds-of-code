---
title: Command-line arguments
type: snippet
language: javascript
tags: [node]
author: chalarangelo
cover: hiking-balance
dateModified: 2022-04-26
---

Gets the command-line arguments passed to a Node.js script.

- Use `process.argv` to get an array of all command-line arguments.
- Use `Array.prototype.slice()` to remove the first two elements (path of the Node.js executable and the file being executed).

```js
const getCmdArgs = () => process.argv.slice(2);
```

```js
// node my-script.js --name=John --age=30
getCmdArgs(); // ['--name=John', '--age=30']
```
