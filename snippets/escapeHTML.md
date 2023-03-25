---
title: Escape HTML
tags: string,regexp
cover: periscope
firstSeen: 2017-12-29T15:09:21+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Escapes a string for use in HTML.

- Use `String.prototype.replace()` with a regexp that matches the characters that need to be escaped.
- Use the callback function to replace each character instance with its associated escaped character using a dictionary object.

```js
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
```

```js
escapeHTML('<a href="#">Me & you</a>');
// '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```
