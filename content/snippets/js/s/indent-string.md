---
title: Indent a JavaScript string
shortTitle: Indent string
language: javascript
tags: [string]
cover: metropolitan-window
excerpt: Indent each line in a string by a specified number of spaces or a custom indentation character.
listed: true
dateModified: 2024-05-19
---

A problem I've stumbled upon a few times is indenting a **multiline string** in JavaScript. This can be useful in a handful of scenarios, but I've found it to be most useful when working with templates or code generation.

Turns out it's a pretty simple operation! All you need is `String.prototype.replace()` and a **regular expression**. Then you'll need the `^` anchor and the `m` flag to match the **start of each line** in a multiline string. By replacing the start of each line with a specified number of spaces or a custom indentation character, you can easily indent the string.

Customization via an optional `indent` parameter allows you to specify the **indentation character**. If you omit this parameter, the default indentation character will be a space (`' '`). Additionally, you can specify the **number of spaces** to indent each line by using the `count` parameter, and use `String.prototype.repeat()` to repeat the indentation character.

```js
const indentString = (str, count, indent = ' ') =>
  str.replace(/^/gm, indent.repeat(count));

indentString('Lorem\nIpsum', 2); // '  Lorem\n  Ipsum'
indentString('Lorem\nIpsum', 2, '_'); // '__Lorem\n__Ipsum'
```
