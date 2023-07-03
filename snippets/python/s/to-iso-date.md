---
title: Date to ISO format
type: snippet
language: python
tags: [date]
cover: succulent-red-light
dateModified: 2021-01-07T23:30:28+02:00
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
