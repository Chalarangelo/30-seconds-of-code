### isSameDate

Check if a date is the same as another date.

Use strict equality checking (`===`) to check if the first date is the same as the second one.

```js
const isSameDate = (dateA, dateB) => dateA === dateB;
```

```js
isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true
```
