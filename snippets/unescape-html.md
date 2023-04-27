---
title: Unescape HTML
tags: string,regexp
cover: little-tree
firstSeen: 2017-12-29T15:09:10+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Unescapes escaped HTML characters.

- Use `String.prototype.replace()` with a regexp that matches the characters that need to be unescaped.
- Use the function's callback to replace each escaped character instance with its associated unescaped character using a dictionary (object).

```js
const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
      }[tag] || tag)
  );
```

```js
unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;');
// '<a href="#">Me & you</a>'
```
