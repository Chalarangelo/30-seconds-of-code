---
title: Days from now
type: snippet
language: python
tags: [date]
cover: clutter
excerpt: Calculates the date of `n` days from today.
listed: true
dateModified: 2020-10-28
---

Calculates the date of `n` days from today.

- Use `datetime.date.today()` to get the current day.
- Use `datetime.timedelta` to add `n` days from today's date.

```py
from datetime import timedelta, date

def days_from_now(n):
  return date.today() + timedelta(n)

days_from_now(5) # date(2020, 11, 02)
```
