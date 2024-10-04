---
title: What does if __name__ == "__main__" do in Python?
shortTitle: Name equals main
language: python
tags: [function]
cover: stairs-from-below
excerpt: Understand what one of the most commonly used Python constructs does and when you should use it.
listed: false
dateModified: 2024-01-17
---

One of the most common lines of code you'll see in Python goes something like this:

```py
if __name__ == "__main__":
  print("Hello, World!")
```

While you might have seen this before, even used it a few times, it might not be clear what it does and how it works. Let's consider the following setup - two scripts, `script1.py` and `script2.py`. `script2.py` imports `script1.py` and calls a function from it.

```py [script1.py]
def do_stuff:
  print('Doing stuff')

do_stuff()
```

```py [script2.py]
from script1 import do_stuff

do_stuff()
```

What do you think happens when you run each of these scripts? Let's see.

```sh
$ python script1.py
# Logs: Doing stuff

$ python script2.py
# Logs: Doing stuff
# Logs: Doing stuff
```

As you can see, the function `do_stuff` is called twice when we run `script2.py`. This is because when we import a module, **Python executes all the code in the module**. So, when we import `script1.py` in `script2.py`, the function `do_stuff` is called once. Then, when we call `do_stuff` again, it's called a second time.

How do we fix this? By adding the `if __name__ == "__main__"` check in `script1.py`. This directive checks if the script is being **run directly**, or if it's being **imported**. If it's being run directly, the code inside the `if` block is executed, otherwise it's not.

```py [script1.py]
def do_stuff:
  print('Doing stuff')

if __name__ == "__main__":
  do_stuff()
```

Now, when we run `script1.py` directly, the function `do_stuff` is called once. When we import `script1.py` in `script2.py`, the function `do_stuff` is not called. So, when we call `do_stuff` in `script2.py`, it's called only once.

```sh
$ python script1.py
# Logs: Doing stuff

$ python script2.py
# Logs: Doing stuff
```
