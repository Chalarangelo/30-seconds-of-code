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
  for (var i = 2; i <= boundary; i++) if (num % i == 0) return false;
  return num >= 2 
  }
  let array = []
  const posFactor = num => {
  let arr = []
  for (let i = 2; i <= num; i++) if (num % i === 0) arr.push(i)
  return arr
  }
  if (int >= 0) array = posFactor(int)
  else {posFactor(-int).forEach(el => array.push(el,-el))}
  array =  prime ? array.filter(el => isPrime(el)) : array;
  return powers ? array.map(x => [x,howManyTimes(int,x)]) : array
};
