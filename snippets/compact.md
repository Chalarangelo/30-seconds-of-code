### compact

Removes falsey values from a list.

Use `filter()` to filter out falsey values (False, None, 0, and "").

```python

def compact(arr):
    return list(filter(lambda x: bool(x), arr))
```

``` python
compact([0, 1, False, 2, '', 3, 'a', 's', 34]) # [ 1, 2, 3, 'a', 's', 34 ]
```