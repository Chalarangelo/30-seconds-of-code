---
title: Date of tomorrow
type: snippet
language: javascript
tags: [date]
cover: travel-mug-2
dateModified: 2020-10-22
---

Results in a string representation of tomorrow's date.

- Use the `Date` constructor to get the current date.
- Increment it by one using `Date.prototype.getDate()` and set the value to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};
```

```js
tomorrow(); // 2018-10-19 (if current date is 2018-10-18)
```
