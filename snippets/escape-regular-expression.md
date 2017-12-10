### Escape regular expression

Use `replace()` to escape special characters.

```js
escapeRegExp = s =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```
