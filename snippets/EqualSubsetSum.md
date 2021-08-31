---
title: Partition Equal Subset Sum
tags: algorithm,array,medium
firstSeen: 2021-08-31T11:07:26+02:00
lastUpdated: 2021-08-31T11:07:26+02:00
---

Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

- Use `Array.prototype.reduce()`, initialized with an empty array accumulator to iterate over `nums`.
- Use `Array.prototype.slice(-1)`, the spread operator (`...`) and the unary `+` operator to add each value to the accumulator array containing the previous sums.

---


```js
const PartitionEqualSubsetSum = (nums) => {
    const totalSum = nums.reduce((a, b) => a + b);
    if(totalSum % 2 === 1) return false;
    const targetSum = totalSum / 2;
    const memoizationTable = new Array(targetSum + 1).fill(0);
    for(let OuterIndex = 0; OuterIndex < nums.length; OuterIndex++) {
        for(let InnerIndex = target; InnerIndex >= nums[OuterIndex]; InnerIndex--) {
            memoizationTable[InnerIndex] = Math.max(memoizationTable[InnerIndex], memoizationTable[InnerIndex - nums[OuterIndex]] + nums[InnerIndex]);
        }
    }
    return memoizationTable[target] === targetSum;

};
```

```js

PartitionEqualSubsetSum([1,5,11,5]); // true
PartitionEqualSubsetSum([1,5,11,4]); // false
```
