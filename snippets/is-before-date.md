---
title: Check if date is before another date
type: snippet
tags: [date]
cover: flower-portrait-3
dateModified: 2020-10-20T23:02:01+03:00
---

Checks if a date is before another date.

- Use the less than operator (`<`) to check if the first date comes before the second one.

```js
const isBeforeDate = (dateA, dateB) => dateA < dateB;
```

```js
isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true
```
