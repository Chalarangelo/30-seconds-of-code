---
title: to_iso_date
tags: date,intermediate
---

Converts a date to its ISO-8601 representation.

- Use `datetime.datetime.isoformat()` to convert the given `datetime.datetime` object to an ISO-8601 date.

```py
from datetime import datetime

def to_iso_date(d):
  return d.isoformat()
```

```py
from datetime import datetime

to_iso_date(datetime(2020, 10, 25)) # 2020-10-25T00:00:00
```
