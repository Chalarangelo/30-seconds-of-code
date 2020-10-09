---
title: getAge
tags: date,beginner
---

Takes the date of birth as a `Date` object and returns the age.

- Subtract the `Date` object from the current `Date` object, and divide by the number of milliseconds in a year.
- Use `Math.round()` to get a natural Number value.

```js
let getAge = date =>
    Math.round((new Date() - date) / (365 * 24 * 60 * 60 *1000))
```

```js
getAge(new Date("1999-9-16")); // 21
```
