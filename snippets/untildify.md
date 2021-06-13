---
title: untildify
tags: node,string,beginner
firstSeen: 2018-01-01T17:43:18+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
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
