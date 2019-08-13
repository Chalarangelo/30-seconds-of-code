---
title: indentString
tags: string,utility,beginner
---

Indents each line in the provided string.

Use `String.replace` and a regular expression to add the character specified by `indent` `count` times at the start of each line.
Omit the third parameter, `indent`, to use a default indentation character of `' '`.

```js
const indentString = (str, count, indent = ' ') => str.replace(/^/gm, indent.repeat(count));
```

```js
indentString('Lorem\nIpsum', 2); // '  Lorem\n  Ipsum'
indentString('Lorem\nIpsum', 2, '_'); // '__Lorem\n__Ipsum'
```