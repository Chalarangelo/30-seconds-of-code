---
title: longFormatDateWithDayPostfix
tags: date,beginner
firstSeen: 2021-10-22T05:00:00+05:30
---

Converts an instance of `Date` to a human readable formatted date string.

- Initialize 2 arrays, one with full and the other with shortened names for all the months.
- Create an inner function (for code reusability) which returns postfix string based on date value.
- Use built-in Date functions along with the above arrays and function to generate a date string.
- Set the 2nd argument for `longFormatDateWithDayPostfix()`, `fullMonth` explicity to `True` to use the full names for months. 
- Omit the 2nd argument or explicitly set it to `False` to use short names for months.

```js
const longFormatDateWithDayPostfix = (date, fullMonth=false) => {
  const monthNameFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNameShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const getDayPostfix = (day) => {
    switch (day % 10) {
      case 1:  return 'st';
      case 2:  return 'nd';
      case 3:  return 'rd';
      default: return 'th';
    }
  }
  const dd = date.getDate();
  const mm = date.getMonth();
  const mn = fullMonth ? monthNameFull[mm] : monthNameShort[mm]
  const yyyy = date.getFullYear();
  return`${dd}${getDayPostfix(dd)} of ${mn}, ${yyyy}`;
} 
```

```js
getLongFormatDate(new Date("2021-10-22")); //"22nd of Oct, 2021"
```
