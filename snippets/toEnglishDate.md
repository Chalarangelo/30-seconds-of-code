### toEnglishDate

Converts a date from American format to English format.

Use `Date.toISOString()`, `split('T')` and `replace()` to convert a date from American format to the English format.
Throws an error if the passed time cannot be converted to a date.

```js
const toEnglishDate = (time) => { try { return new Date(time).toISOString().split('T')[0].replace(/-/g, '/'); } catch (e) {} };
```

```js
toEnglishDate('09/21/2010') // '21/09/2010'
```
