### sampleSize

Returns the length of string.

```js
const sampleSize = (arr,n=1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0,n)
}
```

```js
sampleSize([1,2,3],2); // [3,1]
sampleSize([1,2,3],4); // [2,3,1]
```
