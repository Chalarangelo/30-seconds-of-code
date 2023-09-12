---
title: Indices of two numbers with target sum value
type: snippet
language: python
tags: [list, dictionery]
cover: succulent-red-light
dateModified: 2023-09-12 T23:30:28+02:00
---

An array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

- We are iterating and inserting elements into the hash table and we look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.

```py

def get_target_sum_indices(nums: List[int], target: int) -> List[int]:
    hashmap = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in hashmap:
            return [i, hashmap[complement]]
        hashmap[nums[i]] = i

```
