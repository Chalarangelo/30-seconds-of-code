--- title: isCoprime 
tags: math,beginner 
--- 
Checks whether the two numbers are coprime.
-  Uses already created  `gcd` to calculate. 

```js 
const isCoprime(a,b) => { 
 if (typeof a !== 'number' || typeof b !== 'number')
 throw new TypeError('Expected a number'); 
 return gcd(a, b) === 1 }; 
``` 
```js 
isCoprime(8, 36); // 0 
isCoprime(5,7); // 1 
```
