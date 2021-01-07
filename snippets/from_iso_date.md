---
title: from_iso_date
tags: date,intermediate
---

Converts a date from its ISO-8601 representation.

- Use `datetime.datetime.fromisoformat()` to convert the given ISO-8601 date to a `datetime.datetime` object.

```py
from datetime import datetime

def from_iso_date(d):
  return datetime.fromisoformat(d)
```

```py
from_iso_date('2020-10-28T12:30:59.000000') # 2020-10-28 12:30:59
```
