---
title: "Tip: Watch out for mutable default arguments in Python"
shortTitle: Mutable default arguments
type: tip
tags: [python,function]
cover: goat-wooden-cottage
excerpt: Mutable default arguments can trip up Python beginners and veterans alike. Here's a quick workaround to deal with them.
dateModified: 2022-02-27T05:00:00-04:00
---

Default arguments in Python are evaluated only once. The evaluation happens when the function is defined, instead of every time the function is called. This can inadvertently create **hidden shared state**, if you use a mutable default argument and mutate it at some point. This means that the mutated argument is now the default for all future calls to the function as well.

Take the following code as an example. Every call to the function shares the same list. So, the second time it's called, the function doesn't start out with an empty list. Instead, the default argument is the list containing the value from the previous call.

```py
def append(n, l = []):
  l.append(n)
  return l

append(0) # [0]
append(1) # [0, 1]
```

If you absolutely need to use a mutable object as the default value in a function, you can set the default value of the argument to `None` instead. Then, checking in the function body if it is `None`, you can set it to the mutable value you want without side effects.

```py
def append(n, l = None):
  if l is None:
    l = []
  l.append(n)
  return l

append(0) # [0]
append(1) # [1]
```
