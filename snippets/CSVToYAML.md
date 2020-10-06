---
title: CSVToYAML
tags: string,array,object,YAML,advanced
---

Converts a comma-separated values (CSV) to YAML.
The first row of the string is used as the title row.

- Use `Array.prototype.slice()` and `Array.prototype.indexOf('\n')` and `String.prototype.split(delimiter)` to separate the first row (title row) into values.
- Use `String.prototype.split('\n')` to create a string for each row, then `Array.prototype.map()` and `String.prototype.split(delimiter)` to separate the values in each row.
- Use `Array.prototype.map()` on `values` of the row to build up the object YAML
- Use `Array.prototype.join()` to create a multiline string from the generated pairs. Add a trailing space `\n  ` for proper indentention. It will create an array of strings each reprenents an object in YAML.
- Again use `Array.prototype.join()` to concat the strings and build the final YAML output.
- Omit the second argument, `delimiter`, to use a default delimiter of `,`.

```js
const CSVToYAML = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      line = titles.map((title, index) => `${title}: ${JSON.stringify(values[index])}`).join('\n  ');
      return `- ${line}`;
    }).join('\n')
};
```

```js
CSVToYAML('col1,col2\na,b\nc,d');
// OUTPUT:
// - col1: "a"
//   col2: "b"
// - col1: "c"
//   col2: "d"
```