---
title: Check if date is after another date
tags: date
cover: blog_images/flower-portrait-4.jpg
firstSeen: 2018-09-29T13:58:38+03:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if a date is after another date.

- Use the greater than operator (`>`) to check if the first date comes after the second one.

```js
const isAfterDate = (dateA, dateB) => dateA > dateB;
```

```js
isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
```
