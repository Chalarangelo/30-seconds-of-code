---
title: gcd
tags: math
---
Calculates the greatest common divisor of a list of numbers.

Uses the reduce function from the inbuilt module `functools`. Also uses the `math.gcd` function over a list.

```python
from functools import reduce
import math

def gcd(numbers):
    return reduce(math.gcd, numbers)
```

``` python
gcd([8,36,28]) # 4
```