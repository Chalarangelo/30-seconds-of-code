---
title: JSON to CSV
type: snippet
tags: [array,string,object]
cover: horse-sunset
dateModified: 2021-10-13T19:29:39+02:00
---

Converts an array of objects to a comma-separated values (CSV) string that contains only the `columns` specified.

- Use `Array.prototype.join()` to combine all the names in `columns` to create the first row, using the provided `delimiter`.
- Use `Array.prototype.map()` and `Array.prototype.reduce()` to create a row for each object. Substitute non-existent values with empty strings and only mapping values in `columns`.
- Use `Array.prototype.join()` to combine all rows into a string, separating each row with a newline (`\n`).
- Omit the third argument, `delimiter`, to use a default delimiter of `','`.

```js
const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    ),
  ].join('\n');
```

```js
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b']
); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b'],
  ';'
); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```
