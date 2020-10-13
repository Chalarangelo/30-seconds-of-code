---
title: convertTimestampToDDMMYYYYFormat
tags: Date,intermediate
---

Converts the date timestamp to a string of DD/MM/YYYY format 

- It takes date timestamp as an argument
- Then uses javascript Date APIs to find date, month and year
- Adds a 0 prefix in case date or month lies between 1-9 to maintain the consistency
- Finally returns a string in human readable format of 'DD/MM/YYYY'

```js
const convertTimestampToDDMMYYYYFormat = timestamp => {
  let newDate = new Date(timestamp);
  let date = newDate.getDate();
  let month = (newDate.getMonth() + 1);
  let year = newDate.getFullYear();
  date  = date < 10 ? '0' + date : date
  month  = month < 10 ? '0' + month : month
  return date+'/'+month+'/'+year
}
```

```js
functionName(1601567968000); // 01/10/2020
functionName(1602605218850); // 13/10/2020
```
