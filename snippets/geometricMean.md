---
title: geometricMean
tags: array,intermediate,math
---

Returns you the geometric mean of all the numbers in the array 

- The input should be only an array of numbers.
-The output type will be a number or a undefined
- If array contains anything other than negative numbes it will return undefined else will return the geometric mean

```js
const geometricMean = (nums) =>{

   var prod =1;

   for(let i=0;i<nums.length;i++){
       prod = prod * nums[i];
   }

   if(prod < 0){

      return undefined;
   }
   else{

        var gm = Math.pow(prod,1/nums.length);
        return gm;    
   }
}

```

```js
geometricMean([1,2,3]); //  1.8171205928321397
geometricMean([1,-2,3]) //  undefined
```
