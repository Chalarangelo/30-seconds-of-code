---
title: delay
tags: function,intermediate
---

Invokes the provided function after `ms` milliseconds.

Use `time.sleep()` to delay the execution of `fn` by `ms / 1000` seconds.

```py
from time import sleep

def delay(fn, ms, *args):
  sleep(ms / 1000)
  return fn(*args)
```

```py
delay(
  lambda x: print(x),
  1000,
  'later'
) # prints 'later' after one second
```
