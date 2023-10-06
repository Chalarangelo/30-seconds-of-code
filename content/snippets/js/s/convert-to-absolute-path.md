---
title: Convert to absolute path
type: snippet
language: javascript
tags: [node,string]
cover: lighthouse
dateModified: 2020-10-22
---

Converts a tilde path to an absolute path.

- Use `String.prototype.replace()` with a regular expression and `os.homedir()` to replace the `~` in the start of the path with the home directory.

```js
import { homedir } from 'os';

const untildify = str => str.replace(/^~($|\/|\\)/, `${homedir()}$1`);
```

```js
untildify('~/node'); // '/Users/aUser/node'
```
