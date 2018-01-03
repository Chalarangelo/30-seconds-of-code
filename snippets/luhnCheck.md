### luhnCheck

Implementation of the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.
Works with numbers and strings alike
``` js 
const luhnCheck = num => { 
    let arr = (num+'').split('').reverse()
    let lastDigit = arr.splice(0,1)
    let sum = arr.reduce((acc,val,i) => i%2!==0 ? acc + parseInt(val) : acc + (parseInt(val) * 2)%9 || 9,0)
     sum += parseInt(lastDigit)
     return sum%10 === 0
 }
```
```js
 luhnCheck("4485275742308327"); //true
 luhnCheck(4485275742308327); //true
 luhnCheck(6011329933655299); // true
 luhnCheck(123456789); //false
```
