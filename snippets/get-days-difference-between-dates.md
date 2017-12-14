### Get Days Difference Between Dates

Returns the number of days between two Dates.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
//getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9
```
