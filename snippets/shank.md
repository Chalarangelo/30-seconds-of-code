### shank

Has the same functionality as Array.prototype.splice(), except instead of mutating the passed in array,
it returns a brand new array. Helpful if you are trying to avoid mutation.


```js
/**
 * shank
 * @param arr:any[] - the base array
 * @param index:number - the index to make the change at
 * @param delCount:number - the number of elements to omit
 * @param ...elements:any[] - additional elements to concatinate onto the end of the new array
 * @returns any[]
 */
const shank = (arr, index = 0, delCount = 0, ...elements) => 
  arr.slice(0, index)
     .concat(elements)
     .concat(arr.slice(index + delCount));
```

```js
const names = ['alpha', 'bravo', 'charlie'];
const secondNames = shank(names, 1, 0, 'john');
console.log(names) // ['alpha', 'bravo', 'charlie']
console.log(secondNames) // ['alpha', 'john', 'bravo', 'charlie']
const thirdNames = shank(secondNames, 2, 1, 'jacob', 'jingleheimer');
console.log(secondNames) // ['alpha', 'john', 'bravo', 'charlie']
console.log(thirdNames) // ['alpha', 'john', 'jacob', 'jingleheimer', 'charlie']
```

