---
title: Days ago
type: snippet
language: python
tags: [date]
cover: cup-of-orange
dateModified: 2020-10-28T16:19:30+02:00
---

Calculates the date of `n` days ago from today.

- Use `datetime.date.today()` to get the current day.
- Use `datetime.timedelta` to subtract `n` days from today's date.

```py
from datetime import timedelta, date

def days_ago(n):
  return date.today() - timedelta(n)
```

```py
days_ago(5) # date(2020, 10, 23)
```
