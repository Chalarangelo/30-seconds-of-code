### chunksArray

Chunks the provided array into the given number of arguments. Can be used with strings too using `Strig.protoype.split()` function.

``` js
const chunksArray = (arr,num) => {
  let array = []
  arr.forEach((el,i) => {if (i <= arr.length - num) array.push(arr.slice(i,i+num))} )
  return array.length ? array : [arr]
}
```

```js
chunksArray([1,2,3,4,5],2); //[[1,2],[2,3],[3,4],[4,5]]
chunksArray([1,2,3,4,5],5); //[[1,2,3,4,5]]
chunksArray([1,2,3,4,5],10); //[[1,2,3,4,5]]
```
