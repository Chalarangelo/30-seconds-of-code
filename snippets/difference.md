### difference

Returns the difference between two arrays.

Create a `set` from `b`, then use list comprehension to only keep values not contained in `b`

```python

def difference(a, b):
    b = set(b)
    return [item for item in a if item not in b]
```
``` python
difference([1, 2, 3], [1, 2, 4]) # [3]
```