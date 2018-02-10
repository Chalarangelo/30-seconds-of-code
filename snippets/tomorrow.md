### tomorrow

Results in a string representation of tomorrow's date.
Use `new Date()` to get today's date, adding one day using `Date.getDate()` and `Date.setDate()`, and converting the Date object to a string.

```js
const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return `${String(t.getMonth() + 1).padStart(2, '0')}-${String(
    t.getDate()
  ).padStart(2, '0')}-${t.getFullYear()}`;
};
```

```js
tomorrow(); // 12-27-2017 (if current date is 12-26-2017)
```
