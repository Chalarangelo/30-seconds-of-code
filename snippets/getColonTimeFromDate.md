### getColonTimeFromDate

Formats hour, minute, and second time integers from Date into stringified colon representation. Formats hour integer to 12 hour clock and maintains digit lengths to match (HH:MM:SS).

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8)
```

```js
getColonTimeFromDate(new Date()) // "08:38:00"
```