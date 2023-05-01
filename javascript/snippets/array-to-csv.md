---
title: Array to CSV
type: snippet
tags: [array,string]
cover: sunrise-over-city
dateModified: 2020-11-03T21:55:08+02:00
---

Converts a 2D array to a comma-separated values (CSV) string.

- Use `Array.prototype.map()` and `Array.prototype.join()` to combine individual 1D arrays (rows) into strings, using the provided `delimiter`.
- Use `Array.prototype.join()` to combine all rows into a CSV string, separating each row with a newline (`\n`).
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const arrayToCSV = (arr, delimiter = ',') =>
  arr
    .map(v =>
      v.map(x => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)
    )
    .join('\n');
```

```js
arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // '"a";"b"\n"c";"d"'
arrayToCSV([['a', '"b" great'], ['c', 3.1415]]);
// '"a","""b"" great"\n"c",3.1415'
```
