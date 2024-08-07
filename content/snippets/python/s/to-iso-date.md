---
title: Date to ISO format
type: snippet
language: python
tags: [date]
cover: succulent-red-light
excerpt: Converts a date to its ISO-8601 representation.
listed: true
dateModified: 2021-01-07
---

Converts a date to its ISO-8601 representation.

- Use `datetime.datetime.isoformat()` to convert the given `datetime.datetime` object to an ISO-8601 date.

```py
from datetime import datetime

def to_iso_date(d):
  return d.isoformat()

to_iso_date(datetime(2020, 10, 25)) # 2020-10-25T00:00:00
```
