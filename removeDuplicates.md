### removeDuplicates

Remove the duplicated occurences from a given array.

1. const  distinctiveSet = new Set([1, 2, 3, 1, 1, 4]); // removes the duplicated occurences from the given array and return a new set object
2. const  distinctiveSetArray = [...distinctiveSet]; // the returned set object is converted to back array

```js
const removeDuplicates = arr => [...new Set(arr)]; // final function in shortest form possible
```

```js
removeDuplicates([1, 2, 3, 1, 1, 4]); // [1, 2, 3, 4]
```
