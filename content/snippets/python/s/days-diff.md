---
title: Date difference in days
type: snippet
language: python
tags: [date]
cover: succulent-9
excerpt: Calculates the day difference between two dates.
listed: true
dateModified: 2020-10-28
---

Calculates the day difference between two dates.

- Subtract `start` from `end` and use `datetime.timedelta.days` to get the day difference.

```py
def days_diff(start, end):
  return (end - start).days

from datetime import date

days_diff(date(2020, 10, 25), date(2020, 10, 28)) # 3
```
