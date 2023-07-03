---
title: Date is weekend
type: snippet
language: python
tags: [date]
cover: two-lighthouses
dateModified: 2020-11-02T19:28:05+02:00
---

Checks if the given date is a weekend.

- Use `datetime.datetime.weekday()` to get the day of the week as an integer.
- Check if the day of the week is greater than `4`.
- Omit the second argument, `d`, to use a default value of `datetime.today()`.

```py
from datetime import datetime

def is_weekend(d = datetime.today()):
  return d.weekday() > 4
```

```py
from datetime import date

is_weekend(date(2020, 10, 25)) # True
is_weekend(date(2020, 10, 28)) # False
```
