### factors

Returns the array of factors of the given `int`. If the second argument is set to `true` returns only the prime factors of `int`.If the third argument is set to `true` will return an array of arrays each containing two elements, the `factor` and the number of times the `factor` divides `int`.
If `int` is `1` or `0` returns an empty array.
If `int` is less than `0` returns all the factors of `-int` together with their `additive inverses`.

**Note**:- _Negative numbers are not considered prime._
``` js
const factors = (int,prime = false,powers = false) => {
  const howManyTimes = (num,divisor) => {
    if([1,0].includes(divisor)) return Infinity
    let i = 0
    while(Number.isInteger(num/divisor)){
      i++
      num = num / divisor
    }
    return i
  }
  const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2 
  }
  let isNeg = int < 0;
  int = isNeg ? -int : int;
  let array = Array.from({length: int - 1}).map((val,i) => int % (i+2) === 0 ? (i+2) : false).filter(val => val);
  if(isNeg) array = array.reduce((acc,val) => {acc.push(val); acc.push(-val); return acc}, []);
  array =  prime ? array.filter(el => isPrime(el)) : array;
  return powers ? array.map(x => [x,howManyTimes(int,x)]) : array
}
```

```js
factors(12); //[2,3,4,6,12]
factors(12,true); //[2,3]
factors(12,true,true); //[[2,2], [3,1]]
factors(12,false,true); //[[2,2], [3,1], [4,1], [6,1], [12,1]]
factors(-12); //[2, -2, 3, -3, 4, -4, 6, -6, 12, -12]
factors(12,true); //[2,3]
factors(12,true,true); //[[2,2], [3,1]]
factors(12,false,true); //[[2,2], [-2,2], [3,1], [-3,1], [4,1], [-4,1], [6,1], [-6,1], [12,1], [-12,1]]
```
