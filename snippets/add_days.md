---
title: add_days
tags: date,intermediate
---

Calculates the date of `n` days from the given date.

- Use `datetime.timedelta` and the `+` operator to calculate the new `datetime.datetime` value after adding `n` days to `d`.
- Omit the second argument, `d`, to use a default value of `datetime.today()`.

```py
from datetime import datetime, timedelta

def add_days(n, d = datetime.today()):
  return d + timedelta(n)
```

```py
from datetime import date

add_days(5, date(2020, 10, 25)) # date(2020, 10, 30)
add_days(-5, date(2020, 10, 25)) # date(2020, 10, 20)
```
