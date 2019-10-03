---
title: transpose_matrix
tags: matrix,list,zip,intermediate
---

Obtaining the transpose of a matrix making use of `zip()` function.

Python `zip()` function takes the iterable elements as input and returns the iterator.
Since zip funtion returns a `zip object`, we can cast it as list wit `list()`.
```py
list(zip([1,2,3],['a','b','c'], [True, False, True])) # [(1, 'a', True), (2, 'b', False), (3, 'c', True)]
```

Using `*list`, we can access to each element of the list
```py
[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]  # [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
*[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]] # [1, 2, 3] [4, 5, 6] [7, 8, 9] [10, 11, 12]
```

Combining these two elements we can transpose a matrix. We can access to each row of the matrix using the operator `*` to use them as args of `zip()` function.

```py
def transpose_matrix(l:list):
    return list(zip(*l))
```

```py
print(transpose_matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]])) # [(1, 4, 7, 10), (2, 5, 8, 11), (3, 6, 9, 12)]
```
