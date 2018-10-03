### tomorrow

Results in a string representation of tomorrow's date.

Use `new Date()` to get today's date, adding one day using `Date.getDate()` and `Date.setDate()`, and converting the Date object to a string.

```js
const tomorrow = (long = false) => {
  let t = new Date();
  t.setDate(t.getDate() + 1);

  const year = t.getFullYear();
  const month = String(t.getMonth() + 1).padStart(2, '0');
  const newDate = String(t.getDate()).padStart(2, '0');

  const ret = `${year}-${month}-${newDate}`;
  return !long ? ret : `${ret}T00:00:00`;
};
```

```js
tomorrow(); // 2017-12-27 (if current date is 2017-12-26)
tomorrow(true); // 2017-12-27T00:00:00 (if current date is 2017-12-26)
```
