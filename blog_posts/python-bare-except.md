---
title: "Tip: Avoid using bare except in Python"
type: tip
tags: python,error
authors: maciv
cover: blog_images/dark-cloud.jpg
excerpt: It's generally not a good idea to use bare `except` clause in Python, but do you know why?
firstSeen: 2022-02-20T05:00:00-04:00
---

In Python, keyboard interrupts and system exits are propagated using exceptions (i.e. `KeyboardInterrupt` and `SystemExit`). As a result, a bare `except` clause is going to catch something like the user hitting <kbd>Ctrl</kbd> + <kbd>C</kbd>.

Consider the following code. If the user were to try exiting the program, the keyboard interrupt would be caught by the `except` clause. This would be undesirable, as it prevents the user from actually exiting the program until they provide valid input.

```py
while True:
  try:
    s = input('Input a number:')
    x = int(s)
  except:
    print('Not a number, try again!')
```

A way to prevent this would be to use `Exception` which will ensure that the user will not be trapped. The only problem with this approach is that `Exception` is generic and will handle pretty much anything thrown at it.

```py
while True:
  try:
    s = input('Input a number:')
    x = int(s)
  except Exception:
    print('Not a number, try again!')
```

The correct way to handle errors is to specify the type of error you expect. For example, in this code sample, `ValueError` would be appropriate.

```py
while True:
  try:
    s = input('Input a number:')
    x = int(s)
  except ValueError:
    print('Not a number, try again!')
```

As a rule of thumb, you should only handle expected failure states using `except` with an appropriate error type. In the case of unexpected errors, it might be better to simply let the program fail naturally and exit.
