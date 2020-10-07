---
title: isDateValid
tags: date,beginner
---

Returns `true` if given value is proper to create a valid date object, otherwise it returns `false`

- Use `Date.prototype.valueOf()` and `isNaN` combination to check if value is proper for creating a valid `Date` object
- Input can be any type

```js
const isDateValid = (...val) => !isNaN(new Date(...val).valueOf());
};
```

```js
isDateValid('December 17, 1995 03:24:00') // true
isDateValid('1995-12-17T03:24:00') // true
isDateValid('1995-12-17 T03:24:00') // false
isDateValid('Duck') // false
isDateValid(1995, 11, 17 ) //true
isDateValid(1995, 11, 17, 'Duck') //false
isDateValid({}) // false
```