---
title: Calculate date difference
shortTitle: Date difference
language: python
tags: [date]
cover: succulent-9
excerpt: Calculates the day, month, or year difference between two dates.
listed: false
dateModified: 2024-07-16
---

Calculating the date difference between two dates in Python is a simple as subtracting one date from another. Then, you can use `datetime.timedelta.days`, combined with `math.ceil()` for months, to get the difference in days, months, or years.

```py
def days_diff(start, end):
  return (end - start).days

def months_diff(start, end):
  return ceil((end - start).days / 30)

def years_diff(start, end):
  return ceil((end - start).days / 365)

from datetime import date

days_diff(date(2020, 10, 25), date(2020, 10, 28)) # 3
months_diff(date(2020, 10, 25), date(2020, 11, 25)) # 1
years_diff(date(2020, 10, 25), date(2021, 10, 25)) # 1
```
