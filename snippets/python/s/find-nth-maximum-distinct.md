---
title: find_nth_maximum_distinct
type: snippet
tags: [list, set, sorted, exception]
cover: image
dateModified: 2023-07-17T21:24:28+0000
---

It gives nth largest or smallest element from the distinct list.

- Use set() method on the given list to keep only unique occurrences.
- Use sorted() method on the set to sort.
- The method defined below takes three arguments.
  - lst (list): Pass the list.
  - n (int): Pass the nth value, that you want to find (n must be greater than 0).
  - maximum: (bool): Pass true to find the nth maximum element, and for the smallest element pass False.
  - Exception: If the list doesn't contain 'n' unique elements then it will raise an exception.

```py
# Finding the nth largest or smallest element in the list
def find_nth_maximum_distinct(lst, n=1, maximum=True):
    ''' It will raise an exception when there are too many equal elements
    or there are no nth possible elements present in the list. '''

    if len(set(lst)) >= n:
        return sorted(set(lst), reverse=maximum)[n - 1]
    raise Exception('Too many Equal Elements (Total Unique Elements: {}, Accessing {})'.format(len(set(lst)), n))
```

```py
# how to use this function
lst = [1, 3, 5, 6, 3, 5, 1, 3]  # 1 3 5 6

print(find_nth_maximum_distinct(lst, n=2, maximum=True))  # result 5
print(find_nth_maximum_distinct(lst, 2))  # result 5
print(find_nth_maximum_distinct(lst, 3, maximum=False))  # result 5
print(find_nth_maximum_distinct(lst))  # result 6
print(find_nth_maximum_distinct(lst, n=5, maximum=True))  Exception: Too many Equal Elements (Total Unique Elements: 4, Accessing 5)
```
