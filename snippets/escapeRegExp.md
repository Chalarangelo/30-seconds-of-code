### escapeRegExp

Escapes a string to use in a regular expression.

Use `String.prototype.replace()` to escape special characters.

```js
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
```

```js
escapeRegExp('(test)'); // \\(test\\)
```
