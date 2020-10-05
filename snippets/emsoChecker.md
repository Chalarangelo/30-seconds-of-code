---
title: emsoChecker
tags: random, intermediate
---

Returns `true` if passed Slovenian Unique Master Citizen Number is valid, `false` otherwise.

- Unique Master Citizen Number is a unique identification number that was assigned to every citizen of Republic of Slovenia.
- Use `String.prototype.split('')` and `Array.prototype.map()` to convert string to array of numbers 
- to determine if a given EMŠO is valid.

```js
const emsoChecker = (emso) =>{
  const r = /^[0-9]+$/; 
  if(emso.length !== 13 || !emso.match(r)) return false;
    const numbers = emso.split('').map(x => parseInt(x));
    let value =  11-((7*(numbers[0]+numbers[6])+
             6*(numbers[1]+numbers[7])+
             5*(numbers[2]+numbers[8])+
             4*(numbers[3]+numbers[9])+
             3*(numbers[4]+numbers[10])+
             2*(numbers[5]+numbers[11]))%11);
    if(value > 9) value = 0;
    return value === numbers[12];
}
```

```js
emsoChecker('0101006500006') // true,  it is the number of the first male baby registered in Slovenia on January 1, 2006
emsoChecker('0101006500005') // false,  m equals to 6 but last number is 5
emsoChecker('010100650000d') // false,  string can only contains numbers
emsoChecker('01010065000000') // false,  string must be exactly 13 characters long
```
