---
title: formatToThousands
tags: number,integer,intermediate
---

Returns string of integer formatted with a comma as a thousands separator.

- Takes an integer as an argument and adds commas after every three numbers
- If the integer is less than 1,000, commas will not be added
- Uses `Number.prototype.toString()` to format integer to a string and `String.prototype.replace()` to add a comma after every three numbers

```js
const formatToThousands = (integer) =>
	integer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
```

```js
formatToThousands(123456); // '123,456'
```
