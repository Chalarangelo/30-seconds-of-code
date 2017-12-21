### primes 

It generates primes till a given number ```m

Explain briefly how the snippet works.

```js
const primes = num =>{
  var arr =  Array.from({length:num-1}).map((x,i)=> i+2);
  var sqroot  = Math.floor(Math.sqrt(num));
  var numsTillSqroot  = Array.from({length:numb-1}).map((x,i)=> i+2);
  arra.forEach(x => arr = arr.filter(y => ((y%x)!==0)||(y== x)));
  return arr; 
}// primes(10) -> [2,3,5,7] 
```