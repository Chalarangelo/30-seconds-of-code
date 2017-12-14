### Square The Data

Pass an array of integers you want to sqaure it
Here using `.reduce()` the new object is accumulator and one by one values from array are passed and go through function.

```
const arr = [1,2,3,4,5,6,7];
arr.reduce(function(a,b){
a[b] = b * b;
return a;
},{}) // {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49}
// 
callback	accumulator	currentValue	currentIndex	array	           return value
first call	1	              1		        0        [0, 1, 2, 3, 4]	  1
second call	2	              2		        1        [0, 1, 2, 3, 4]	  4
third call	3	              3		        2        [0, 1, 2, 3, 4]	  9
...
```
