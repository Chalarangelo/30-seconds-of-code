---
title: closest-lower-prime
tags: utility,math,beginner
---

Checks the closest prime under a certain number.

- isPrime Checks numbers from `2` to the square root of parameter.
- largestPrimeNumberClose creates array based off number and reverses order
- finds the first prime number in array and returns


```javascript
 //checking if number is prime
function isPrime(num) {
    for(let i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num;
  }

function largestPrimeNumberClose(n) {
    //creating new array based on input and reversing
    const array = [...Array(n).keys()].reverse();
    //executing prime function
    firstPrime = array.find(isPrime)
    return firstPrime 
};
```

```javascript
    largestPrimeNumberClose(56) // 53
    largestPrimeNumberClose(650) // 647
```
     