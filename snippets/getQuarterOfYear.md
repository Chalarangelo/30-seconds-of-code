---
title: getQuarterOfYear.md
tags: array,intermediate
---

It returns the quarter and year to which the supplied date belongs to.

- getMonth() function return 0 to 11 based on the month and hence I am adding 1 to it.
- getFullYear() function returns the full year of the passed date.
- in the return statement we have used string literals to combine stirng with our variables. we are dividing the month by 3 as we have 4 quarters in a year.

```js
const getQuarterOfYear = (date) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `Q${Math.ceil(month / 3)}-${year}`;
};
```

```js
getQuarterOfYear("07/10/2018"); // Q3-2018 (dateformat: mm/dd/yyyy)
getQuarterOfYear("12/12/2020"); // Q4-2020 (dateformat: mm/dd/yyyy)
```
