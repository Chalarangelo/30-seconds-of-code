---
title: Date difference in months
tags: date
expertise: beginner
author: maciv
firstSeen: 2020-10-28T16:20:39+02:00
lastUpdated: 2020-10-28T16:20:39+02:00
---

Calculates the month difference between two dates.

- Subtract `start` from `end` and use `datetime.timedelta.days` to get the day difference.
- Divide by `30` and use `math.ceil()` to get the difference in months (rounded up).

```py
from math import ceil

def months_diff(start, end):
  return ceil((end - start).days / 30)
```

```py
from datetime import date

months_diff(date(2020, 10, 28), date(2020, 11, 25)) # 1
```
