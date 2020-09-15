---
title: normalizeLineEndings
tags: array,intermediate
---

Normalizes line endings in a string.

- Use `String.prototype.replace()` and a regular expression to match and replace line endings with the `normalized` version.
- Omit the seconds argument, `normalized`, to use the default value of `'\r\n'`.

```js
const normalizeLineEndings = (str, normalized = '\r\n') => str.replace(/\r?\n/g, normalized);
```

```js
splitLines('This\r\nis a\nmultiline\nstring.\r\n'); // 'This\r\nis a\r\nmultiline\r\nstring.\r\n'
splitLines('This\r\nis a\nmultiline\nstring.\r\n', '\n'); // 'This\nis a\nmultiline\nstring.\n'
```
