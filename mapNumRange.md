### mapNumRange

Maps a number from one range to another range.

Returns `num` mapped between `out_min` to `out_max` from `in_min` to `in_max` 
```js
const distance = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
```

```js
mapNumRange(5,0,10,0,100); // 50
```
