### join

Is like `Array.join()` but with an additional argument of `end`(is equal to `separator` by default) which is used to separate the second to last and last items in the array. Returns `""` when the array is empty and the first item when the length of array is 1.

```js
const join = (arr,separator = ',',end = separator ) => {
      return arr.reduce((acc,val,i) => {
       return  i == arr.length - 2 ? acc + val + end : i == arr.length - 1 ? acc + val : acc + val + separator
     },'')
 }
```

```js
join(); // ''
join(['pen','pineapple','apple','pen'],',','&'); //"pen,pineapple,apple&pen"
join(['pen','pineapple','apple','pen'],','); //"pen,pineapple,apple,pen"
join(['pen','pineapple','apple','pen']); //"pen,pineapple,apple,pen"
```
