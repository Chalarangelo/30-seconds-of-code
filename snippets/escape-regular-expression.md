### Escape regular expression

Use `replace()` to escape special characters.

```js
const escapeRegExp = s =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)
```
