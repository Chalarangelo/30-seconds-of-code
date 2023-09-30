---
title: Split into lines
type: snippet
language: javascript
tags: [string,regexp]
cover: lake-bench
dateModified: 2020-10-22
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
