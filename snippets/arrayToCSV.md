### arrayToCSV

Converts a 2D array to a comma-separated values (CSV) string.

Use `Array.map()` and `String.join(delimiter)` to combine individual 1D arrays (rows) into strings.
Use `String.join('\n')` to combine all rows into a CSV string, separating each row with a newline.
Omit the second argument, `delimiter` to use a default delimiter of `,`.

```js
const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.join(delimiter)).join('\n');
```

```js
arrayToCSV([['a', 'b'], ['c', 'd']]); // 'a,b\nc,d'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // 'a;b\nc;d'
```
