---
title: spread
tags: list
---
Implements javascript's `[].concat(...arr)`. Flattens the list(non-deep) and returns an list.

```py
def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret
```


```py
spread([1,2,3,[4,5,6],[7],8,9]) # [1,2,3,4,5,6,7,8,9]
```