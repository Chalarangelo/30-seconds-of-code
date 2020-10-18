---
title: normalizeLineEndings
tags: string,intermediate
---

Normalizes line endings in a string.

- Use `String.prototype.replace()` and a regular expression to match and replace line endings with the `normalized` version.
- Omit the second argument, `normalized`, to use the default value of `'\r\n'`.

```js
const normalizeLineEndings = (str, normalized = '\r\n') => str.replace(/\r?\n/g, normalized);
```

```js
normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n'); // 'This\r\nis a\r\nmultiline\r\nstring.\r\n'
normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n', '\n'); // 'This\nis a\nmultiline\nstring.\n'
```
