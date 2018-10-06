### toTitleCase

Converts a string to title case (every word begins with capital)

Split string on spaces and then sets first character of every word to capital

```js
const toTitleCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x[0].toUpperCase() + x.slice(1).toLowerCase())
    .join(' ');
```

```js
toTitleCase('hello world'); // 'Hello World'
toTitleCase('testing'); // 'Testing'
toTitleCase('Mr john smith'); // 'Mr John Smith'

```
