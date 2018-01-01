### join



```js
const join = (arr,start = ',',end = start) => {
      return arr.reduce((acc,val,i) => {
       return  i == arr.length - 2 ? acc + val + end : i == arr.length - 1 ? acc + val : acc + val + start
     },'')
 }
```

```js
join(); // ''
join(['pen','pineapple','apple','pen'],',','&'); //"pen,pineapple,apple&pen"
join(['pen','pineapple','apple','pen'],','); //"pen,pineapple,apple,pen"
join(['pen','pineapple','apple','pen']); //"pen,pineapple,apple,pen"
```
