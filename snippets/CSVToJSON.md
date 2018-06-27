### CSVToJSON

Converts a comma-separated values (CSV) string to a 2D array of objects.
The first row of the string is used as the title row.

Use `Array.slice()` and `Array.indexOf('\n')` and `String.split(delimiter)` to separate the first row (title row) into values.
Use `String.split('\n')` to create a string for each row, then `Array.map()` and `String.split(delimiter)` to separate the values in each row.
Use `Array.reduce()` to create an object for each row's values, with the keys parsed from the title row.
Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
    });
};
```

```js
CSVToJSON('col1,col2\na,b\nc,d'); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON('col1;col2\na;b\nc;d', ';'); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
```
