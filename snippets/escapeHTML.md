### escapeHTML

Escapes a string for use in HTML.

Use `String.replace()` with a regex that matches the characters that need to be escaped, using a callback function to replace each character instance with its associated escaped character using a dictionary (object).

```js
const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\'': '&#39;',
    '"': '&quot;'
  })[tag] || tag);
```

```js
escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```
