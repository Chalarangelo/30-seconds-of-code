### count_by

:information_source: Already implemented via `collections.Counter`

Groups the elements of a list based on the given function and returns the count of elements in each group.

Use `map()` to map the values of the list using the given function. Iterate over the map and increase the the elements count each time it occurs.

```python
def count_by(arr, fn=lambda x: x):
    key = {}
    for el in map(fn, arr):
        key[el] = 0 if el not in key else key[el]
        key[el] += 1
    return key
```

``` python
from math import floor
count_by([6.1, 4.2, 6.3], floor) # {4: 1, 6: 2}
count_by(['one', 'two', 'three'], len) # {3: 2, 5: 1}
```