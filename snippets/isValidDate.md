---
title: isValidDate
tags: date, intermediate
firstSeen: 2021-06-13T05:00:00-04:00
---

Checks if the given date is valid or invalid.

- Set default date format `dd/mm/yyyy` if `dateFormat` is not provided.
- Exclude day, month and year characters and set the value to `delimiter`.
- Create an array `theFormat` to store the format order by of day, month and year.
- Create an array `theDate` to store the value of day, month and year.
- Use `isDate()` function to check if `theDate`is a valid or invalid date.
  

```js
const isValidDate = (value, dateFormat) =>
{
  dateFormat = dateFormat || 'dd/mm/yyyy';
 
  var delimiter = /[^mdy]/.exec(dateFormat)[0];
 
  var theFormat = dateFormat.split(delimiter);
 
  var theDate = value.split(delimiter);
 
  function isDate(date, format) {
    
    var m, d, y, i = 0, len = format.length, f;
    for (i; i < len; i++) {
      
      f = format[i];
      
      if (/d/.test(f)) d = date[i];
      if (/m/.test(f)) m = date[i];
      if (/y/.test(f)) y = date[i];
      }
    
    return (
      m > 0 && m < 13 &&
      y && y.length === 4 &&
      d > 0 &&
      d <= (new Date(y, m, 0)).getDate()
    );
  }
 
  return isDate(theDate, theFormat);
}
```

```js
isValidDate('31-1-2021', 'dd-mm-yyyy'); // true
isValidDate('31.2.2021', 'dd.mm.yyyy'); // false
```