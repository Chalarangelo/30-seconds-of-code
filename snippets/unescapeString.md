### unescapeString

Unescapes a string from HTML.

Use a chain of `String.replace()` calls combined with regular expressions to replace special characters with the proper symbols.

```js
const unescapeString = str =>
  str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&#39;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
```

```js
unescapeString('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // '<a href="#">Me & you</a>'
```
