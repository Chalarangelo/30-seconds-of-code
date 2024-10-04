---
title: Command-line arguments in Node.js
shortTitle: Command-line arguments
language: javascript
tags: [node]
cover: hiking-balance
excerpt: Learn how to extract command-line arguments passed to a Node.js script.
listed: true
dateModified: 2024-05-22
---

When working with Node.js scripts, you might need to access the **command-line arguments** passed to the script. This can be useful for configuring the script or passing additional information to it. But how can you do that?

## The `process.argv` array

Node.js provides the `process.argv` array, which contains the command-line arguments passed to the Node.js process. The first two elements of the array are the **path of the Node.js executable** and the **file being executed**. Let's look at an example to make it clearer:

```js
// $ node my-script.js --name=John --age=30

process.argv;
/* [
  '/path/to/node',
  '/path/to/my-script.js',
  '--name=John',
  '--age=30'
] */
```

## Extracting command-line arguments

In order to get only the command-line arguments passed to the script, you can use `Array.prototype.slice()` to **remove the first two elements** of the `process.argv` array. Then, you can use them as needed in your script.

```js
const getCmdArgs = () => process.argv.slice(2);

// $ node my-script.js --name=John --age=30
getCmdArgs(); // ['--name=John', '--age=30']
```

## Checking if a flag is present

If you need to check if a specific flag is present in the command-line arguments, you can use `Array.prototype.every()` and `Array.prototype.includes()` to check if `process.argv` contains the specified flag. Then, you can use a regular expression to test if the specified flag is prefixed with `-` or `--` and prefix it accordingly.

```js
const hasFlags = (...flags) =>
  flags.every(flag =>
    process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag)
  );

// node my-script.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false
```
