---
title: binaryDataToBase64String
tags: node,binary,base64,string,beginner
---

Convert file / binary data to base64 string.

- Use `readFileSync` function in `fs` node package to create a `Buffer` from a file.
- Creates a new buffer from file using `Buffer.from(string)` function.
- Convert buffer to string using `toString(encoding)` function.

```js
const fs = require('fs');
const base64_encode = async(file) => {
  const bitmap = fs.readFileSync(file);
  const base64result = Buffer.from(bitmap).toString('base64');
  return base64result;
};

```

```js
base64_encode('./path/toyourfile.pdf'); // 'Li9wYXRoL3RveW91cmZpbGUucGRmxxxxxxxxxx'
```
