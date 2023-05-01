---
title: Split into lines
type: snippet
tags: [string,regexp]
cover: two-cities
dateModified: 2020-10-22T20:24:30+03:00
---

Splits a multiline string into an array of lines.

- Use `String.prototype.split()` and a regular expression to match line breaks and create an array.

```js
const splitLines = str => str.split(/\r?\n/);
```

```js
splitLines('This\nis a\nmultiline\nstring.\n');
// ['This', 'is a', 'multiline', 'string.' , '']
```
