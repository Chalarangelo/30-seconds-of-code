---
title: inlineJSON
tags: array,string,object,intermediate
---

Converts a javascript object or array of objects to a string and inlines it.

- Use `JSON.stringify` to create a string representation of the object or array.
- Use `String.prototype.replace(/\r?\n|\r/g, '')` to remove newline characters.
- The regex pattern `/\r?\n/|\r` accounts for Carriage Return (CR, \r, on older Macs), Line Feed (LF, \n, on Unices incl. Linux) or CR followed by LF (\r\n, on WinDOS).
- The `g` or _global_ match in the regex pattern matches all newlines.

```js
const inlineJSON = (json) => JSON.stringify(json).replace(/\r?\n|\r/g, '');
```

```js
inlineJSON ({ a: 1, b: 'two' }); // '{"a":1,"b":"two"}'
inlineJSON([ {a: 1}, {b: 'two'} ]); // '[{"a":1},{"b":"two"}]'
```
