---
title: Check if process arguments contain flags
type: snippet
tags: [node]
cover: white-tablet
dateModified: 2020-10-22T20:23:47+03:00
---

Checks if the current process's arguments contain the specified flags.

- Use `Array.prototype.every()` and `Array.prototype.includes()` to check if `process.argv` contains all the specified flags.
- Use a regular expression to test if the specified flags are prefixed with `-` or `--` and prefix them accordingly.

```js
const hasFlags = (...flags) =>
  flags.every(flag =>
    process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag)
  );
```

```js
// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false
```
