---
title: Check if date is after another date
type: snippet
language: javascript
tags: [date]
cover: flower-portrait-4
dateModified: 2020-10-20
---

Checks if a date is after another date.

- Use the greater than operator (`>`) to check if the first date comes after the second one.

```js
const isAfterDate = (dateA, dateB) => dateA > dateB;
```

```js
isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
```
