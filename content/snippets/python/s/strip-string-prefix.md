---
title: A common mistake to avoid when stripping a prefix from a string in Python
shortTitle: Strip prefix from string
language: python
tags: [string]
cover: cave-exploration
excerpt: Using `str.lstrip()` to strip a prefix from a string might not be exactly what you're looking for. Here's what you should use instead.
listed: false
dateModified: 2024-01-18
---

Let's say you have a string and you want to **strip a prefix** from it. For example, you have a string `s = "Hello, World!"` and you want to strip the prefix `"Hello, "`. You might be tempted to use `str.lstrip()` to do this.

```py
s = "Hello, World!"
s.lstrip("Hello, ") # "World!"
```

This seems like it works alright, but let's try it with a few more examples to get a better idea of what's going on.

```py
url = "www.google.com"
url.lstrip("www.") # "google.com"

other_url = "www.wikipedia.com"
other_url.lstrip("www.") # "ikipedia.com"
```

_What's going on with that last one?_ you might be asking. Well, `str.lstrip()` actually expects a **list of characters to strip** from the string, not a prefix. So, when you pass it `"www."`, it strips all the characters in the string `"www."` from the start of the string. In fact, that's equal to passing it `"w."`.

So, `str.lstrip()` is not the right tool for the job after all. Instead, you should use `str.removeprefix()`. This method is designed to do exactly what you want - remove a prefix from a string.

```py
url = "www.wikipedia.com"
url.removeprefix("www.") # "wikipedia.com"
```
