![Logo](/icon.png)

# 30-seconds-of-python-code
[![License](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/kriadmin/30-seconds-of-python-code/blob/master/LICENSE) [![Gitter chat](https://img.shields.io/badge/chat-on%20gitter-4FB999.svg)](https://gitter.im/30-seconds-of-python-code/Lobby) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Travis Build](https://travis-ci.org/kriadmin/30-seconds-of-python-code.svg?branch=master)](https://travis-ci.org/kriadmin/30-seconds-of-python-code) [![Insight.io](https://img.shields.io/badge/insight.io-Ready-brightgreen.svg)](https://insight.io/github.com/kriadmin/30-seconds-of-python-code/tree/master/?source=0) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

>Python implementation of 30-seconds-of-code.

**Note**:- This is in no way affiliated with the original [30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code/).


### chunk 

Chunks an array into smaller lists of a specified size.

Uses `range` to create a list of desired size. Then use `map` on this list and fill it with splices of `arr`.

```python 


from math import ceil


def chunk(arr, size):
    return list(
        map(lambda x: arr[x * size:x * size + size],
            list(range(0, ceil(len(arr) / size)))))

```

``` python
chunk([1,2,3,4,5],2) # [[1,2],[3,4],5]
```

### count_occurences

Counts the occurrences of a value in an list.

Uses the `reduce` functin from built-in module `functools` to increment a counter each time you encounter the specific value inside the list.

```python 


def count_occurences(arr, val):
    return reduce(
        (lambda x, y: x + 1 if y == val and type(y) == type(val) else x + 0),
        arr)

```

```python
count_occurrences([1, 1, 2, 1, 2, 3], 1) # 3
```
### count_vowels

Retuns `number` of vowels in provided `string`.

Use a regular expression to count the number of vowels `(A, E, I, O, U)` in a string.

```python 


import re


def count_vowels(str):
    return len(len(re.findall(r'[aeiou]', str, re.IGNORECASE)))

```

``` python
count_vowels('foobar') # 3
count_vowels('gym') # 0
```

### deep_flatten

Deep flattens a list.

Use recursion. Use `list.extend()` with an empty array (`result`) and the spread function to flatten a list. Recursively flatten each element that is a list.

```python 


def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret

 def deep_flatten(arr):
    result = []
    result.extend(spread(list(map(lambda x : deep(x) if type(x) == list else x,arr))))
    return result






























































































```

```python
deep_flatten([1, [2], [[3], 4], 5]) # [1,2,3,4,5]
```
### gcd

Calculates the greatest common divisor between two or more numbers/lists.

The `helperGcdfunction` uses recursion. Base case is when `y` equals `0`. In this case, return `x`. Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

Uses the reduce function from the inbuilt module `functools`. Also defines a method `spread` for javascript like spreading of lists.

```python 


from functools import reduce


def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret


def gcd(*args):
    numbers = []
    numbers.extend(spread(list(args)))

    def _gcd(x, y):
        return x if not y else gcd(y, x % y)

    return reduce((lambda x, y: _gcd(x, y)), numbers)

```


``` python
gcd(8,36) # 4
```
### lcm 

Returns the least common multiple of two or more numbers.

Use the `greatest common divisor (GCD)` formula and the fact that `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple. The GCD formula uses recursion.

Uses `reduce` function from the inbuilt module `functools`. Also defines a method `spread` for javascript like spreading of lists.

```python 


from functools import reduce


def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret


def lcm(*args):
    numbers = []
    numbers.extend(spread(list(args)))

    def _gcd(x, y):
        return x if not y else gcd(y, x % y)

    def _lcm(x, y):
        return x * y / _gcd(x, y)

    return reduce((lambda x, y: _lcm(x, y)), numbers)

```


``` python
lcm(12, 7) # 84
lcm([1, 3, 4], 5) # 60
```
### spread

Implements javascript's spread syntax as a function. Flattens the list(non-deep) and returns an list.

```python 


def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret

```


```python
spread([1,2,3,[4,5,6],[7],8,9]) # [1,2,3,4,5,6,7,8,9]
```

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*
