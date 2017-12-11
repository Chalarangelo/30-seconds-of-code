### Escape regular expression

Use `replace()` to escape special characters.

```js
var escapeRegExp = s =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```
