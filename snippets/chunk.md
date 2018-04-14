### chunk

Chunks an list into smaller lists of a specified size.

Uses `range` to create a list of desired size. Then use `map` on this list and fill it with splices of `lst`.

```python
from math import ceil


def chunk(lst, size):
    return list(
        map(lambda x: lst[x * size:x * size + size],
            list(range(0, ceil(len(lst) / size)))))
```

``` python
chunk([1,2,3,4,5],2) # [[1,2],[3,4],5]
```
