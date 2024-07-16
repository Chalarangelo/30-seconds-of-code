---
title: Delayed function execution
type: snippet
language: python
tags: [function]
cover: succulent-10
excerpt: Invokes the provided function after `ms` milliseconds.
listed: true
dateModified: 2020-11-02
---

Invokes the provided function after `ms` milliseconds.

- Use `time.sleep()` to delay the execution of `fn` by `ms / 1000` seconds.

```py
from time import sleep

def delay(fn, ms, *args):
  sleep(ms / 1000)
  return fn(*args)

delay(lambda x: print(x), 1000, 'later') # prints 'later' after one second
```
