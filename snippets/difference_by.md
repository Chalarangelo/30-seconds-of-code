### difference_by
``` python
def difference_by(a, b, fn):
    b = set(map(fn,b))
    return [item for item in a if fn(item) not in b]
```

```python
difference_by([2.1, 1.2], [2.3, 3.4],floor); // [1.2]
difference_by([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], lambda v : v['x']); // [ { x: 2 } ]
```