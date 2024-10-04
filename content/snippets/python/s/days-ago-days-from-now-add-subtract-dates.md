---
title: Days ago, days from now, add and subtract dates
shortTitle: Days ago, days from now
language: python
tags: [date]
cover: cup-of-orange
excerpt: Calculate dates relative to today or a given date by adding or subtracting days.
listed: false
dateModified: 2024-05-19
---

## Days ago

To calculate the date of `n` days ago from today, simply use `datetime.date.today()` to get the current day and `datetime.timedelta` to subtract `n` days from it.

```py
from datetime import timedelta, date

def days_ago(n):
  return date.today() - timedelta(n)

days_ago(5) # date(2020, 10, 23)
```

## Days from now

Similarly, to calculate the date of `n` days from today, use `datetime.date.today()` to get the current day and `datetime.timedelta` to add `n` days to it.

```py
from datetime import timedelta, date

def days_from_now(n):
  return date.today() + timedelta(n)

days_from_now(5) # date(2020, 11, 02)
```

## Add days

In order to calculate the date of `n` days from the given date, you can use `datetime.timedelta` and the `+` operator to calculate the new `datetime.datetime` value after adding `n` days to `d`.

```py
from datetime import date, datetime, timedelta

def add_days(n, d = datetime.today()):
  return d + timedelta(n)

add_days(5, date(2020, 10, 25)) # date(2020, 10, 30)
add_days(-5, date(2020, 10, 25)) # date(2020, 10, 20)
```

## Subtract days

Finally, to calculate the date of `n` days before the given date, you can use `datetime.timedelta` and the `-` operator to calculate the new `datetime.datetime` value after subtracting `n` days from `d`.

```py
from datetime import date, datetime, timedelta

def subtract_days(n, d = datetime.today()):
  return d - timedelta(n)

subtract_days(5, date(2020, 10, 25)) # date(2020, 10, 20)
subtract_days(-5, date(2020, 10, 25)) # date(2020, 10, 30)
```
