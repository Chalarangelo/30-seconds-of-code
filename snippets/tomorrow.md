### tomorrow

Results in a string representation of tomorrow's date.

First we use `new Date()` to get today's date, then add one day using `Date.getDate()` and mutate the initial `Date` via `Date.setDate()`. Then we use construct the date string in `yyyy-mm-dd` format.

```js
const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split('T')[0];
};
```

```js
tomorrow(); // 2018-10-18 (if current date is 2018-10-18)
// if you need the time to indicate the start of the day as well:
`${tomorrow()}T00:00:00}: // 2018-10-18T00:00:00
```
