---
title: CSV to JSON
tags: string,object
cover: kettle-laptop
firstSeen: 2018-06-27T21:14:24+03:00
lastUpdated: 2022-01-30T12:14:39+02:00
---

Converts a comma-separated values (CSV) string to a 2D array of objects.
The first row of the string is used as the title row.

- Use `Array.prototype.indexOf()` to find the first newline character (`\n`).
- Use `Array.prototype.slice()` to remove the first row (title row) and `String.prototype.split()` to separate it into values, using the provided `delimiter`.
- Use `String.prototype.split()` to create a string for each row.
- Use `String.prototype.split()` to separate the values in each row, using the provided `delimiter`.
- Use `Array.prototype.reduce()` to create an object for each row's values, with the keys parsed from the title row.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};
```

```js
CSVToJSON('col1,col2\na,b\nc,d');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON('col1;col2\na;b\nc;d', ';');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
```
