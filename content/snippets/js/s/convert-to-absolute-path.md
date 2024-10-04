---
title: Convert a tilde path to an absolute path in Node.js
shortTitle: Convert to absolute path
language: javascript
tags: [node,string,regexp]
cover: lighthouse
excerpt: Ever wanted to convert a tilde path to an absolute path? Here's how you can do it in JavaScript.
listed: true
dateModified: 2024-03-19
---

Have you ever wanted to convert a **tilde path** to an **absolute path** in JavaScript? Maybe you've used the [`untildify` package](https://www.npmjs.com/package/untildify), but you want to do it without a dependency. Or you're just wondering how it works under the hood.

As with many other things in JavaScript, the answer is to simply use a **regular expression**. The expression that's often used to match a tilde path is `^~($|\/|\\)`. This expression matches a tilde (`~`) at the start of the string, followed by either the end of the string, a forward slash, or a backslash.

Having matched the tilde path, you can then use `os.homedir()` to get the home directory and `String.prototype.replace()` to replace the tilde with the **home directory**.

```js
import { homedir } from 'os';

const untildify = str => str.replace(/^~($|\/|\\)/, `${homedir()}$1`);

untildify('~/node'); // '/Users/aUser/node'
```
