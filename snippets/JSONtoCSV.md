### JSONtoCSV

Converts an array of objects to a comma-separated values (CSV) string that contains only the `columns` specified.

Use `Array.prototype.join(delimiter)` to combine all the names in `columns` to create the first row.
Use `Array.prototype.map()` and `Array.prototype.reduce()` to create a row for each object, substituting non-existent values with empty strings and only mapping values in `columns`.
Use `Array.prototype.join('\n')` to combine all rows into a string.
Omit the third argument, `delimiter`, to use a default delimiter of `,`.

```js
const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n');
```

```js
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
```
