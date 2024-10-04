---
title: Escape or unescape HTML using JavaScript
shortTitle: Escape or unescape HTML
language: javascript
tags: [string,regexp]
cover: above-the-rocks
excerpt: Learn how to convert text into HTML-safe strings and vice versa using JavaScript.
listed: true
dateModified: 2024-02-18
---

Escaping and unescaping HTML is an unavoidable part of web development. In essence, all you have to do to convert text into an **HTML-safe string** is to replace the characters that have special meaning in HTML with their respective **HTML entities**. The reverse operation is to replace the HTML entities with their respective characters.

Here's a table of the characters that need to be escaped and their respective HTML entities:

| Character | HTML Entity |
| --------- | ----------- |
| `&`       | `&amp;`     |
| `<`       | `&lt;`      |
| `>`       | `&gt;`      |
| `'`       | `&#39;`     |
| `"`       | `&quot;`    |

## Escape HTML

Using `String.prototype.replace()` with a **regular expression** that matches the characters that need to be escaped, you can replace each character instance with its associated escaped character using a dictionary object.

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

escapeHTML('<a href="#">Me & you</a>');
// '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```

## Unescape HTML

Unescaping HTML is the reverse operation of escaping HTML. Again, using `String.prototype.replace()` with an appropriate regular expression should suffice.

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

unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;');
// '<a href="#">Me & you</a>'
```
