### unescapeHTML

Unescapes escaped HTML characters.

Use `String.replace()` with a regex that matches the characters that need to be escaped, using a callback function to replace each escaped character instance with its associated unescaped character using a dictionary (object).

```js
const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': '\'',
    '&quot;': '"'
  })[tag] || tag);```
```js
unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // '<a href="#">Me & you</a>'
```
