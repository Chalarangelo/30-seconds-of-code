### isWeekend

Results in a boolean representation of a specific date.

Pass the specific date object firstly.
Use `Date.getDay()` to check weekend then return a boolean.

```js
const isWeekend = (t = new Date()) => {
  return t.getDay() === 0 || t.getDay() === 6;
};
```

```js
isWeekend(); // 2018-10-19 (if current date is 2018-10-18)
```
