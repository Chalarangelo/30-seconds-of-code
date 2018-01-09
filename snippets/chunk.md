### chunk 

Chunks an array into smaller arrays of a specified size.

Uses `range` to create a list of desired size. Then use `map` on this list and fill it with splices of `arr`

```python 
from math import ceil


def chunk(arr, size):
    return list(
        map(lambda x: arr[x * size:x * size + size],
            list(range(0, ceil(len(arr) / size)))))

```

``` python
chunk([1,2,3,4,5],2) # [[1,2],[3,4],5]
```