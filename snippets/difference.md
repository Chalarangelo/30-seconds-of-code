### difference

Returns the difference between two iterables.

Use list comprehension to only keep values not contained in `b`

```python
def difference(a, b):
    return [item for item in a if item not in b]
```
``` python
difference([1, 2, 3], [1, 2, 4]) # [3]
```
