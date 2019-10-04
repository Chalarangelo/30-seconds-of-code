---
title: median
tags: math,beginner
---

Finds the median of a list of numbers.

Sort the numbers of the list using `list.sort()` and find the median, which is either the middle element of the list if the list length is odd or the average of the two middle elements if the list length is even.

```py
def median(list):
  list.sort()
  list_length = len(list)
    if list_length%2==0:
  return (list[int(list_length/2)-1] + list[int(list_length/2)])/2
  else:
    return list[int(list_length/2)]
```

```py
median([1,2,3]) # 2
median([1,2,3,4]) # 2.5
```
