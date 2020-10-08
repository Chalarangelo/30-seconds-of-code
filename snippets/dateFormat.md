---
title: dateFormat
tags: string,date,beginner
---

It converts the DMY date string format to the global and standard *ISO 8601* format using split and some JS logic; you can use this logic with objects too.

- Declarate a `string` dd/mm/yyyy date format.
- Use `split()` to split the format between '/'.
- Creates a new `date` with the yyyy/mm/dd standard format then prints.

```js
const ddmmyyyDate ='10/12/2020';

const dateSplit = ddmmyyyDate.split('/');
const dateSwap = new Date(+dateSplit[2], dateSplit[1]-1, +dateSplit[0]);
```

```js
console.log(dateSwap) // 2020-12-10T03:00:00.000Z
```
