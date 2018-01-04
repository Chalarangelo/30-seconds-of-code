### formatDuration

Returns the human readable format of the given number of milliseconds.

Divide `ms` with the appropriate values to obtain the appropriate values for `day`, `hour`, `minute`, `second` and `millisecond`.
Use `Object.entries()` with `Array.filter()` to keep only non-zero values.
Use `Array.map()` to create the string for each value, pluralizing appropriately.
Use `String.join(', ')` to combine the values into a string.

``` js
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
    .join(', ');
};
```

```js
formatDuration(1001); // "1 second, 1 millisecond"
formatDuration(343250555); // "3 days, 23 hours, 20 minutes, 50 seconds, 555 milliseconds"
formatDuration(34325055574); // "397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds"
```
