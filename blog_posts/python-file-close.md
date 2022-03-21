---
title: How to correctly close files in Python
shortTitle: Closing files
type: story
tags: python,file
expertise: beginner
author: maciv
cover: blog_images/flower-pond.jpg
excerpt: When working with files in Python, it's important to ensure that the file is closed correctly. Here are a couple of ways to do that.
firstSeen: 2022-02-03T05:00:00-04:00
---

When working with files in Python, it's quite common to explicitly invoke the `close()` method after processing the file. This might work fine in a lot of cases, however it's a common pitfall for beginners and developers coming from other languages.

Take for example the following code. If an exception is thrown before calling the `close()` method, the file would remain open. In such a scenario, the code would stop executing before `close()` is called, leaving the file open after the program crashes.

```py
f = open('filename', 'w')
f.write('Hello world!')
f.close()
```

One way to mitigate this problem is to encapsulate the `write()` call in a `try` statement. This way, you can handle any exceptions and you can use `finally` to ensure the file gets closed.

```py
f = open('filename', 'w')
try:
  f.write('Hello world!')
finally:
  f.close()
```

Another option offered by Python is to use a `with` statement which will ensure the file is closed when the code that uses it finishes running. This holds true even if an exception is thrown.

```py
with open('filename', 'w') as f:
  f.write('Hello world!')
```
