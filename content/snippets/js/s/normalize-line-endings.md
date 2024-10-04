---
title: Normalize line endings in a JavaScript string
shortTitle: Normalize line endings
language: javascript
tags: [string,regexp]
cover: red-light
excerpt: Having trouble with inconsistent line endings in your strings? Normalize them with this handy JavaScript function!
listed: true
dateModified: 2024-05-24
---

Historically, different operating systems have used **different characters to represent line endings** in text files. For example, **Windows** uses `'\r\n'` (carriage return + line feed), **Unix-like systems** use `'\n'` (line feed), and **older Mac systems** used `'\r'` (carriage return). All of these differences can cause issues when working with text files or strings.

**Normalization** is the process of converting all line endings in a string to a consistent format. Often, you'll want to convert all line endings to a specific format, such as `'\r\n'` or `'\n'`.

Luckily, all you need to do is use `String.prototype.replace()` with a **regular expression** to match and replace line endings. As the sequences of characters are known and ordered consistently, you need only check for an **optional carriage return** (`\r?`) **followed by a line feed** (`\n`).

```js
const normalizeLineEndings = (str, normalized = '\n') =>
  str.replace(/\r?\n/g, normalized);

normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n');
// 'This\nis a\nmultiline\nstring.\n'

normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n', '\r\n');
// 'This\r\nis a\r\nmultiline\r\nstring.\r\n'
```

> [!NOTE]
>
> As the much older Mac systems are no longer in common use, you can safely **ignore the standalone carriage return** (`\r`) character in most cases. However, if you need to support these systems, you can modify the regular expression to include it: `/\r?\n|\r/g`.
