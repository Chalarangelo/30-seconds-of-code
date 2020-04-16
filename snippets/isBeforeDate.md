---
title: isBeforeDate
tags: date,beginner
---

Check if a date is before another date.

Use the less than operator (`<`) to check if the first date comes before the second one.

```js
const isBeforeDate = (dateA, dateB) => dateA < dateB;
```

```js
isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true
```
