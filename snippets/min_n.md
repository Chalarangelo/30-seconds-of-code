### min_n

Returns the `n` minimum elements from the provided list. If `n` is greater than or equal to the provided list's length, then return the original list(sorted in ascending order).

Use `list.sort()` combined with the `deepcopy` function from the inbuilt `copy` module to create a shallow clone of the list and sort it in ascending order. Use `[:n]` to get the specified number of elements. Omit the second argument, `n`, to get a one-element list

```python
from copy import deepcopy


def min_n(lst, n=1):
    numbers = deepcopy(lst)
    numbers.sort()
    return numbers[:n]
```

```python
min_n([1, 2, 3]) # [1]
min_n([1, 2, 3], 2) # [1,2]
```
