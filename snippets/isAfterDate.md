---
title: isAfterDate
tags: date,beginner
---

Check if a date is after another date.

Use the greater than operator (`>`) to check if the first date comes after the second one.

```js
const isAfterDate = (dateA, dateB) => dateA > dateB;
```

```js
isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
```
