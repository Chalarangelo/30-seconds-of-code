---
title: Search the target number in a list
type: snippet
language: python
tags: [list]
cover: arrays
dateModified: 2023-06-03T23:16:07-04:00
---

Given an array of integers nums and an integer target. The function is used to search target in nums.  

- if the list has not been sorted, we use the `sorted()` built-in function to sort the list in ascending order.
- If target exists, then return its index.
- Otherwise, return -1

```py
sorted(nums)
```

```py
def search(nums: List[int], target: int):
  for i in range(0, len(nums)):
    b = 0
    if target == nums[i]:
      a = i
      b = 1
      break
    else:
      continue
  if b == 1:
    return a
  else: 
    return -1
```

```py
search([-1,0,3,5,9,12], 9) #4
search([-1,0,3,5,9,12], 2) #-1
```