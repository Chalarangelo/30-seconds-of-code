---
title: Date is weekend or weekday
language: python
tags: [date]
cover: two-lighthouses
excerpt: Checks if the given date is a weekend or a weekday.
listed: false
dateModified: 2024-05-23
---

## Date is weekend

To check if the given date is a weekend, you can use `datetime.datetime.weekday()` to get the day of the week as an integer. Then, you can check if the day of the week is greater than `4`.

```py
from datetime import datetime, date

def is_weekend(d = datetime.today()):
  return d.weekday() > 4

is_weekend(date(2020, 10, 25)) # True
is_weekend(date(2020, 10, 28)) # False
```

## Date is weekday

For the opposite case (checking if the date is a weekday), you can use the same technique, but checking if the day of the week is less than or equal to `4`.

```py
from datetime import datetime, date

def is_weekday(d = datetime.today()):
  return d.weekday() <= 4

is_weekday(date(2020, 10, 25)) # False
is_weekday(date(2020, 10, 28)) # True
```
