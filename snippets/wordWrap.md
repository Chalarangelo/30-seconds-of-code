---
title: Word wrap string
tags: string,regexp
expertise: intermediate
firstSeen: 2020-10-06T11:48:41+03:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Wraps a string to a given number of characters using a string break character.

- Use `String.prototype.replace()` and a regular expression to insert a given break character at the nearest whitespace of `max` characters.
- Omit the third argument, `br`, to use the default value of `'\n'`.

```js
const wordWrap = (str, max, br = '\n') => str.replace(
  new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), '$1' + br
);
```

```js
wordWrap(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.',
  32
);
// 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nFusce tempus.'
wordWrap(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.',
  32,
  '\r\n'
);
// 'Lorem ipsum dolor sit amet,\r\nconsectetur adipiscing elit.\r\nFusce tempus.'
```
