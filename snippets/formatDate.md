---
title: formatDate
tags: date,intermediate
---

Returns the date formatted according to the format passed as a parameter.

- Pass a valid string to the `new Date()` as the first parameter.
- Pass a return format as the second parameter of the function (`d` for day, `M` for month, `y` for year, `h` for hour, `m` for minute and `s` for seconds).
- Try to explain everything briefly but clearly.
- A date is created with the first parameter
- Each part of the date is separated
- Date parts are added in formatting

```js
const formatDate = (date, format) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const datetime = new Date(date);
  const day = datetime.getDate() + 1;
  const monthName = months[datetime.getMonth()];
  const month = datetime.getMonth() + 1;
  const year = datetime.getFullYear();
  const hour = datetime.getHours();
  const minutes = datetime.getMinutes();
  const seconds = datetime.getSeconds();

  const formatString = new String(format);
  isNamedMonth = formatString.search("MMM");

  if (isNamedMonth > 0) {
    return formatString
      .replace("dd", day)
      .replace("MMM", monthName)
      .replace("yyyy", year)
      .replace("HH", hour)
      .replace("mm", minutes)
      .replace("ss", seconds);
  } else {
    return formatString
      .replace("dd", day)
      .replace("MM", month)
      .replace("yyyy", year)
      .replace("HH", hour)
      .replace("mm", minutes)
      .replace("ss", seconds);
  }
};
```

```js
formatDate("2020-12-05", "dd/MM/yyyy"); // '05/12/2020'
```
