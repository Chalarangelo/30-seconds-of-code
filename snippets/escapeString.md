### escapeString

Escapes a string for use in HTML.

Use a chain of `String.replace()` calls combined with regular expressions to replace special characters with the proper symbols.

```js
const escapeString = str =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
```

```js
escapeString('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```
