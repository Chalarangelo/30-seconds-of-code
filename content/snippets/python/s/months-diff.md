---
title: Date difference in months
type: snippet
language: python
tags: [date]
cover: succulent-11
excerpt: Calculates the month difference between two dates.
listed: true
dateModified: 2020-10-28
---

Calculates the month difference between two dates.

- Subtract `start` from `end` and use `datetime.timedelta.days` to get the day difference.
- Divide by `30` and use `math.ceil()` to get the difference in months (rounded up).

```py
from math import ceil
from datetime import date

def months_diff(start, end):
  return ceil((end - start).days / 30)

months_diff(date(2020, 10, 28), date(2020, 11, 25)) # 1
```
