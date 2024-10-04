---
title: Convert between CSV and JavaScript arrays, objects or JSON
shortTitle: Convert between CSV and array, object or JSON
language: javascript
tags: [array,object,string]
cover: tropical-bike
excerpt: Serialize and deserialize CSV data in JavaScript with this in-depth guide.
listed: true
dateModified: 2024-06-08
---

**Comma-separated values (CSV)** is a simple text format for storing tabular data. Each line in a CSV file represents a row, and each value in a row is **separated by a delimiter**, usually a comma. As CSV is used very often for exchanging data between different systems, it's important to know how to convert between JavaScript arrays or objects and CSV data.

> [!NOTE]
>
> As [CSV format RFC 4180](https://tools.ietf.org/html/rfc4180) is **not standardized**, there are many variations in how CSV data is formatted. This guide will cover the **most common cases**, but you may need to adjust the code to fit your specific use-case (see the table below for edge cases and how they are handled).

## Converting to CSV

**Serializing data** to CSV is generally straightforward. Using `Array.prototype.join()` with a delimiter of your choice, you can easily create a single **row from an array of values**.

```js
const serializeRow = (row, delimiter = ',') => row.join(delimiter);

serializeRow(['a', 'b']);
// 'a,b'
serializeRow(['a', 'b'], ';');
// 'a;b'
```

However, there are **edge cases** that need handling. These include empty values, values that contain the delimiter character, values that contain newlines, and values that contain double quotes. Here's a handy table of edge cases and how to handle them:

| Case | Sample value | CSV representation |
| --- | --- | --- |
| Simple case | `['a','b']` | `a,b` |
| Empty value | `['a',null]` | `a,` |
| Value contains delimiter | `['a,b','c']` | `"a,b",c` |
| Value contains newline | `['a\nb','c']` | `"a\\nb",c` |
| Value contains double quotes | `['a"b','c']` | `"a""b",c` |

That being said, we can update our `serializeRow` function to handle these edge cases. We should also extract the logic for **serializing a single value** to a separate function. Additionally, let's define a function that checks for **empty values**, so we can customize it as needed.

```js
const isEmptyValue = value =>
  value === null || value === undefined || Number.isNaN(value);

const serializeValue = (value, delimiter = ',') => {
  if (isEmptyValue(value)) return '';
  value = `${value}`;
  if (
    value.includes(delimiter) ||
    value.includes('\n') ||
    value.includes('"')
  )
    return `"${value.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
  return value;
};

const serializeRow = (row, delimiter = ',') =>
  row.map(value => serializeValue(`value`, delimiter)).join(delimiter);

serializeRow(['a', 'b']);
// 'a,b'
serializeRow(['a', null]);
// 'a,'
serializeRow(['a,b', 'c']);
// '"a,b",c'
serializeRow(['a\nb', 'c']);
// '"a\\nb",c'
serializeRow(['a"b', 'c']);
// '"a""b",c'
```

Now that we have a way to serialize values and rows, we can move on to more complex use-cases, such as serializing a whole array of values or objects.

### Array to CSV

Serializing an **array of values** into CSV is essentially just moving from one dimension to two. We can use `Array.prototype.map()` to serialize each row and then join them together with **newline characters** (`\n`).

```js
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(row => serializeRow(row, delimiter)).join('\n');

arrayToCSV([['a', 'b'], ['c', 'd']]);
// 'a,b\nc,d'
arrayToCSV([['a,b', 'c'], ['d', 'e\n"f"']]) ;
// '"a,b",c\nd,"e\\n""f"""'
```

### Object to CSV

Converting JavaScript **objects** to CSV is a bit more involved. As objects contain **key-value pairs**, we need to serialize the values in the correct order based on the keys. We can either use a **predefined list of keys** or **extract them from the objects** themselves. Additionally, we'll have to include the keys as the **header (first row)** of the CSV.

#### Header extraction

In short, extracting the header row from the objects involves collecting all **unique keys** from the objects. We can achieve this by using `Array.prototype.reduce()` and a `Set` to keep track of the unique keys.

```js
const extractHeaders = (arr) =>
  [...arr.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set())];

extractHeaders([
  { a: 1, b: 2 },
  { a: 3, b: 4, c: 5 },
  { a: 6 },
  { b: 7 },
]);
// ['a', 'b', 'c']
```

#### Object serialization

Now that we have the headers, we can use them to serialize the objects into CSV. In order to allow for more flexibility, we'll pass the headers as an argument to the function. This way, we can **omit headers or include only specific ones**. The default value for the argument should be the result of `extractHeaders`. Moreover, we may want to omit the header row altogether, so we'll add an optional argument for that as well.

> [!TIP]
>
> As a rule of thumb, the objects need to be **JSON-serializable**, or at least the subset of keys we're interested in.

```js
const objectToCSV = (
  arr,
  headers = extractHeaders(arr),
  omitHeaders = false,
  delimiter = ','
) => {
  const headerRow = serializeRow(headers, delimiter);
  const bodyRows = arr.map(obj =>
    serializeRow(
      headers.map(key => obj[key]),
      delimiter
    )
  );
  return omitHeaders
    ? bodyRows.join('\n')
    : [headerRow, ...bodyRows].join('\n');
};

objectToCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }]
);
// 'a,b,c\n1,2,\n3,4,5\n6,,\n,7,'
objectToCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b']
);
// 'a,b\n1,2\n3,4\n6,\n,7'
objectToCSV(
  [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
  ['a', 'b'],
  true
);
// '1,2\n3,4\n6,\n,7'
```

### JSON to CSV

Converting **JSON data** to CSV is a simple extension of the previous functions. We can parse the JSON data into an array of objects and then use the `objectToCSV` function to serialize it.

```js
const JSONToCSV = (json, headers, omitHeaders) =>
  objectToCSV(JSON.parse(json), headers, omitHeaders);

JSONToCSV(
  '[{"a":1,"b":2},{"a":3,"b":4,"c":5},{"a":6},{"b":7}]'
);
// 'a,b,c\n1,2,\n3,4,5\n6,,\n,7,'
JSONToCSV(
  '[{"a":1,"b":2},{"a":3,"b":4,"c":5},{"a":6},{"b":7}]',
  ['a', 'b']
);
// 'a,b\n1,2\n3,4\n6,\n,7'
JSONToCSV(
  '[{"a":1,"b":2},{"a":3,"b":4,"c":5},{"a":6},{"b":7}]',
  ['a', 'b'],
  true
);
// '1,2\n3,4\n6,\n,7'
```

## Parsing CSV

Parsing CSV data back into arrays or objects can be trickier than serialization. The same **edge cases** need to be handled when deserializing the data. Let's focus on **row deserialization** first. While we can use regular expressions for a more elegant solution, we'll stick to a simple `while` loop for this implementation for readability.

Starting from the beginning of the row, we'll **iterate over each character** and build up the values. We will keep **track if we're inside quotations**, while also **skipping two subsequent quotes** if they're part of an escaped quote. When we encounter the **delimiter character** and we're not inside quotations, we'll push the value to the array and move on to the next one. We'll also use `String.prototype.replace()` to handle escaped quotes and newlines and to trim enclosing quotes from the values.

```js
const deserializeRow = (row, delimiter = ',') => {
  const values = [];
  let index = 0, matchStart = 0, isInsideQuotations = false;
  while (true) {
    if (index === row.length) {
      values.push(row.slice(matchStart, index));
      break;
    }
    const char = row[index];
    if (char === delimiter && !isInsideQuotations) {
      values.push(
        row
          .slice(matchStart, index)
          .replace(/^"|"$/g, '')
          .replace(/""/g, '"')
          .replace(/\\n/g, '\n')
      );
      matchStart = index + 1;
    }
    if (char === '"')
      if (row[index + 1] === '"') index += 1;
      else isInsideQuotations = !isInsideQuotations;
    index += 1;
  }
  return values;
};

deserializeRow('a,b');
// ['a', 'b']
deserializeRow('a,');
// ['a', '']
deserializeRow('"a,b",c');
// ['a,b', 'c']
deserializeRow('"a""b",c');
// ['a"b', 'c']
deserializeRow('"a\\nb",c');
// ['a\nb', 'c']
```

Having a function to deserialize a single row, we can now move on to deserializing the whole CSV data. We'll split the data into rows and use the `deserializeRow` function to extract the values.

> [!NOTE]
>
> **All values are strings after deserialization**. To convert them back to their original types, you'll have to do so manually. As this will depend on your specific use-case, **it will not be covered here**, however you can easily add an **optional argument to parse values** as needed.

```js
const deserializeCSV = (data, delimiter = ',') =>
  data.split('\n').map(row => deserializeRow(row, delimiter));

deserializeCSV('a,b\nc,d');
// [['a', 'b'], ['c', 'd']]
deserializeCSV('a;b\nc;d', ';');
// [['a', 'b'], ['c', 'd']]
deserializeCSV('"a,b",c\n"a""b",c');
// [['a,b', 'c'], ['a"b', 'c']]
deserializeCSV('a,\n"a\\nb",c');
// [['a', ''], ['a\nb', 'c']]
```

### CSV to array

The previous function is a good starting point for deserializing CSV data into **arrays**. However, we might want to **omit the header row**. We can add an optional argument to the function to handle this.

```js
const CSVToArray = (data, delimiter = ',', omitHeader = false) => {
  const rows = data.split('\n');
  if (omitHeader) rows.shift();
  return rows.map(row => deserializeRow(row, delimiter));
};

CSVToArray('a,b\nc,d');
// [['a', 'b'], ['c', 'd']]
CSVToArray('a;b\nc;d', ';');
// [['a', 'b'], ['c', 'd']]
CSVToArray('col1,col2\na,b\nc,d', ',', true);
// [['a', 'b'], ['c', 'd']]
```

### CSV to object

Converting CSV data into **objects** needs a couple of extra steps. We need to **extract the header row** to use as keys for the objects. We can then use these keys to create objects for each row. We'll use the same `deserializeRow` function to extract the values for each row.

```js
const CSVtoObject = (data, delimiter = ',') => {
  const rows = data.split('\n');
  const headers = deserializeRow(rows.shift(), delimiter);
  return rows.map((row) => {
    const values = deserializeRow(row, delimiter);
    return headers.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {});
  });
};

CSVtoObject('col1,col2\na,b\nc,d');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
CSVtoObject('col1;col2\na;b\nc;d', ';');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
```

### CSV to JSON

Converting CSV data into **JSON** is a simple extension of the previous functions. We can use the `CSVtoObject` function to parse the CSV data into objects and then use `JSON.stringify` to serialize it.

```js
const CSVToJSON = (data, delimiter = ',') =>
  JSON.stringify(CSVtoObject(data, delimiter));

CSVToJSON('col1,col2\na,b\nc,d');
// '[{"col1":"a","col2":"b"},{"col1":"c","col2":"d"}]'
CSVToJSON('col1;col2\na;b\nc;d', ';');
// '[{"col1":"a","col2":"b"},{"col1":"c","col2":"d"}]'
```

## Summary

This guide covered **most of the groundwork** necessary to convert between CSV data and JavaScript arrays, objects, or JSON. The provided functions can be **customized or extended**, depending on your specific needs. Remember that CSV is **not a standardized format**, so you may need to adjust the code to fit your specific use-case.

<details>
<summary>View the complete implementation</summary>

```js [serializeCSV.js]
const isEmptyValue = value =>
  value === null || value === undefined || Number.isNaN(value);

const serializeValue = (value, delimiter = ',') => {
  if (isEmptyValue(value)) return '';
  value = `${value}`;
  if (
    value.includes(delimiter) ||
    value.includes('\n') ||
    value.includes('"')
  )
    return `"${value.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
  return value;
};

const serializeRow = (row, delimiter = ',') =>
  row.map(value => serializeValue(`value`, delimiter)).join(delimiter);

const extractHeaders = (arr) =>
  [...arr.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set())];

const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(row => serializeRow(row, delimiter)).join('\n');

const objectToCSV = (
  arr,
  headers = extractHeaders(arr),
  omitHeaders = false,
  delimiter = ','
) => {
  const headerRow = serializeRow(headers, delimiter);
  const bodyRows = arr.map(obj =>
    serializeRow(
      headers.map(key => obj[key]),
      delimiter
    )
  );
  return omitHeaders
    ? bodyRows.join('\n')
    : [headerRow, ...bodyRows].join('\n');
};

const JSONToCSV = (json, headers, omitHeaders) =>
  objectToCSV(JSON.parse(json), headers, omitHeaders);
```

```js [deserializeCSV.js]
const deserializeRow = (row, delimiter = ',') => {
  const values = [];
  let index = 0, matchStart = 0, isInsideQuotations = false;
  while (true) {
    if (index === row.length) {
      values.push(row.slice(matchStart, index));
      break;
    }
    const char = row[index];
    if (char === delimiter && !isInsideQuotations) {
      values.push(
        row
          .slice(matchStart, index)
          .replace(/^"|"$/g, '')
          .replace(/""/g, '"')
          .replace(/\\n/g, '\n')
      );
      matchStart = index + 1;
    }
    if (char === '"')
      if (row[index + 1] === '"') index += 1;
      else isInsideQuotations = !isInsideQuotations;
    index += 1;
  }
  return values;
};

const deserializeCSV = (data, delimiter = ',') =>
  data.split('\n').map(row => deserializeRow(row, delimiter));

const CSVToArray = (data, delimiter = ',', omitHeader = false) => {
  const rows = data.split('\n');
  if (omitHeader) rows.shift();
  return rows.map(row => deserializeRow(row, delimiter));
};

const CSVtoObject = (data, delimiter = ',') => {
  const rows = data.split('\n');
  const headers = deserializeRow(rows.shift(), delimiter);
  return rows.map((row) => {
    const values = deserializeRow(row, delimiter);
    return headers.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {});
  });
};

const CSVToJSON = (data, delimiter = ',') =>
  JSON.stringify(CSVtoObject(data, delimiter));
```

</details>
