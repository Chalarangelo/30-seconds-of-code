---
title: Convert to absolute path
type: snippet
tags: [node,string]
cover: lighthouse
dateModified: 2020-10-22T20:24:44+03:00
---

Converts a tilde path to an absolute path.

- Use `String.prototype.replace()` with a regular expression and `os.homedir()` to replace the `~` in the start of the path with the home directory.

```js
const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);
```

```js
untildify('~/node'); // '/Users/aUser/node'
```
