---
title: CreditChecker
tags: array,intermediate
---

The function in used to check whether CreditCard number is valid

- It takes creditCard number as an array
- It then uses the _Lauhn Method_ to check the credit card number
- It then returns true it credit card number is correct.

```js
const CreditChecker=(arr)=>{
  let  Credit= arr;
  let sum = 0;
  for(let i=arr.length;i>=0;i--)
    {
        let num = Credit[i];
      // Double every other number
      if(i !==0 && i%2==0)
        {
          num = [i] * 2;
        }
      // if double number is greater than 9
      if(num > 9)
        {
          num-=9;
        }
      sum+=num;
    }  
  if(sum%10===0){
       return true;
     }else {
       return false;
     }
};
```

```js
const number = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
CreditChecker(number); // 'True'
```
