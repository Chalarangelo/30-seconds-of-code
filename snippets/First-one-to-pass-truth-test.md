### First-one-to-pass-truth-test

A function that looks through an array (first argument) and returns the first element in the array that passes a truth test (second argument).

```
findElement = (arr, func) => {
  filterArr = arr.filter(func); //filter array with the function provided
  return filterArr[0]; //return the first element that returns true, or undefined if no elements return true
}

// test here
findElement([1, 2, 3, 4], function(num){ return num !== 2 && num !== 1 }); //3 <- first element in array to be passed truth test
```
