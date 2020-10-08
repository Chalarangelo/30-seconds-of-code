---
title: dateFormat
tags: string,beginner
---

It converts the normal date format in certain regions to the global and standard format using split and some JS logic.

- Declarate a string dd/mm/yyyy date format.
- Use split() to split the format between '/'.
- Creates a new date with the yyyy/mm/dd standard format then prints.

```js
const ddmmyyyDate ='10/12/2020';

const dateSplit = ddmmyyyDate.split('/');
const dateSwap = new Date(+dateSplit[2], dateSplit[1]-1, +dateSplit[0]);
```

```js
console.log(dateSwap)
```
