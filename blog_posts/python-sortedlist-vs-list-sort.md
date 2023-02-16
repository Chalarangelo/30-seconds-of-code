---
title: What is the difference between list.sort() and sorted() in Python?
shortTitle: List.sort vs sorted
type: question
tags: python,list
cover: duck-plants
excerpt: Learn the difference between Python's built-in list sorting methods and when one is preferred over the other.
firstSeen: 2020-12-31T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Python provides two ways to sort a list, the built-in list method `list.sort()` and the built-in function `sorted()`. Although both will sort the elements of a list, if used incorrectly they can produce unexpected or undesired results.

### Differences and similarities

The primary difference between the two is that `list.sort()` will sort the list in-place, mutating its indexes and returning `None`, whereas `sorted()` will return a new sorted list leaving the original list unchanged. Another difference is that `sorted()` accepts any iterable while `list.sort()` is a method of the `list` class and can only be used with lists.

```py
nums = [2, 3, 1, 5, 6, 4, 0]

print(sorted(nums))   # [0, 1, 2, 3, 4, 5, 6]
print(nums)           # [2, 3, 1, 5, 6, 4, 0]

print(nums.sort())    # None
print(nums)           # [0, 1, 2, 3, 4, 5, 6]
```

Both `list.sort()` and `sorted()` have the same `key` and `reverse` optional arguments and can be called on each list element prior to making comparisons.

### When to use each one

`list.sort()` should be used whenever mutating the list is intended and retrieving the original order of the elements is not desired. On the other hand, `sorted()` should be used when the object to be sorted is an iterable (e.g. list, tuple, dictionary, string) and the desired outcome is a sorted list containing all elements.
