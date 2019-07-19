### isWeekday

Results in a boolean representation of a specific date.

Pass the specific date object firstly.
Use `Date.getDay()` to check weekday then return a boolean.

```js
const isWeekday = (t = new Date()) => {
  return t.getDay() >= 1 && t.getDay() <= 5;
};
```

```js
isWeekday(); // true (if current date is 2019-07-19)
```
