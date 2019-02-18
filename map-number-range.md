### mapNumRange

Maps a number from one range to another range.

Returns a mapped num from the in range to the out range. 

```js
const mapNumRange = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
```

```js
mapNumRange(5,0,10,0,100); // '50'
```
