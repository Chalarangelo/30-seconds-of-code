---
title: radixSort
tags: algorithm,array,intermediate
firstSeen: 2021-06-23T13:46:18+00:00
lastUpdated: 2021-06-23T13:46:18+00:00
---

Sorts an array of numbers, using the radix sort algorithm.

- Radix sort is one of the most effecient way for sorting Integers.
- Where the time complexity of the sort does not depends on `length of the array`. It depends on `length of the largest number in array`.
- Ex: The time complexity of the array `[455,22,54,1,444]` The largest number is `455`. The length is 3. So, it runs for 3 times.
- Time complexity: `O(lenght of largest Number)`.
- The sort works using bucket method.
- `mostDigits` function used to get the length of largest element in the array.
- `getDigit` function used to get an individual element to push into bucket.
- The main disadvantage of radix sort is. It can be only applied to Array of Integers.
- Use the spread operator (`...`) to clone the original array, `nums`.

```js
const getDigit = (value, pos) => {
  return Math.floor(Math.abs(value) / Math.pow(10,pos)) % 10;
}

const digitCount = number => {
  if(number == 0) return 1;
  return Math.floor(Math.log10(Math.abs(number))) + 1;
}

const mostDigits = nums => {
  let maxDigits = 0;
  for(let i=0;i<nums.length;i++){
      maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

const radixSort = nums => {
  let largest_digit_length = mostDigits(nums);
  for (let i = 0; i < largest_digit_length; i++) {        
    let digitBuckets = Array.from({ length: 10 }, () => []);        
    for(let j = 0;j <nums.length; j++){
      let digit = getDigit(nums[j],i);
      digitBuckets[digit].push(nums[j]);                          
    }
    nums = [].concat(...digitBuckets);                              
  }
  return nums;
}
```

```js
raddixSort([2, 1, 4, 3]); // [1, 2, 3, 4]
```
