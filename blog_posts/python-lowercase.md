---
title: How do I convert a string to lowercase in Python?
type: question
tags: python,string
author: maciv
cover: blog_images/type-stamps.jpg
excerpt: Learn of the two different way to convert a string to lowercase in Python and understand when you should use each one with this quick guide.
firstSeen: 2020-11-15T14:13:55+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### str.lower()

Python's standard method for converting a string to lowercase is `str.lower()` and is compatible with both Python 2 and Python 3. While this is the standard way for most cases, there are certain cases where this method might not be the most appropriate, especially if you are working with Unicode strings.

```py
'Hello'.lower()               # 'hello'
'Straße'.lower()              # 'straße'
'Straße'.upper().lower()      # 'strasse'
# Example of incorrect result when used for unicode case-insensitive matching
'Straße'.upper().lower() == 'Straße'.lower() # False ('strasse' != 'straße')
```

### str.casefold()

Python 3 introduced `str.casefold()`, which is very similar to `str.lower()`, but more aggressive as it is intended to remove all case distinctions in Unicode strings. It implements the casefolding algorithm as described in [section 3.13 of the Unicode Standard](https://www.unicode.org/versions/Unicode9.0.0/ch03.pdf).

```py
'Hello'.casefold()            # 'hello'
'Straße'.casefold()           # 'strasse'
'Straße'.upper().casefold()   # 'strasse'
# Returns the correct result when used for unicode case-insensitive matching
'Straße'.upper().casefold() == 'Straße'.casefold() # True
```
