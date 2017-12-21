### primes 

It generates primes till a given number. 

It works with the Sieve of Eratosthenes. It generate an array from 2 to the given number. Then it filters out the values (Using Array.filter()) divisible by any number from 2 to square root of the provided number.
```js
const primes = num => {
  var arr =  Array.from({length:num-1}).map((x,i)=> i+2);
  var sqroot  = Math.floor(Math.sqrt(num));
  var numsTillSqroot  = Array.from({length:sqroot-1}).map((x,i)=> i+2);
  numsTillSqroot.forEach(x => arr = arr.filter(y => ((y%x)!==0)||(y==x)));
  return arr; 
}// primes(10) -> [2,3,5,7] 
```