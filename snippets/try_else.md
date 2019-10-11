---
title: Try else
tags: utility,intermediate
---

Rises an `exception` if it is caught in the `try` block.

You can have an else clause as part of a `try/except` block, which is executed if no `exception` is thrown.

```py
try:
    5*6
except TypeError:
    print("An exception was raised")
else:
    print("No exceptions were raised.")
```

