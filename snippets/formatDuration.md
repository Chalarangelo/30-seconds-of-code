###formatDuration

Returns the human readable format of the given number of milliseconds. If milliseconds is equal to `0` return `'now'` .

``` js
const formatDuration = milliseconds => {
if(milliseconds === 0) return 'now'
if(milliseconds < 0) milliseconds = -milliseconds
const join = (arr, separator = ',', end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i == arr.length - 2
        ? acc + val + end
        : i == arr.length - 1 ? acc + val : acc + val + separator,
    ''
  );
const pluralize = (num, word, plural = word + 's') =>
    Number(num) === 1 ? word : plural;
  let date = new Date(milliseconds)
  let array = [date.getUTCMilliseconds(),date.getUTCSeconds(),date.getUTCMinutes(),date.getUTCHours(),date.getUTCDate()-1,date.getUTCMonth(),date.getUTCFullYear()-1970]
  let time = ["millisecond","second","minute","hour","day","month","year"]
  array = array.map((el,i) => [el,time[i]]).filter(el => el[0] !== 0).map(el => [el[0],pluralize(el[0],el[1])]).map(el => el[0] + ' ' + el[1])
  return join(array.reverse(),', ',' and ')
}
```
