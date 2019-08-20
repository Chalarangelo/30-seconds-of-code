![Logo](/icon.png)

## 30-seconds-of-python-code

> Curated collection of useful Python snippets that you can understand in 30 seconds or less.

* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
* If you want to follow 30-seconds-of-code on social media, you can find us on [Facebook](https://www.facebook.com/30secondsofcode), [Instagram](https://www.instagram.com/30secondsofcode) and [Twitter](https://twitter.com/30secondsofcode).

#### Related projects

* [30 Seconds of CSS](https://30-seconds.github.io/30-seconds-of-css/)
* [30 Seconds of Interviews](https://30secondsofinterviews.org/)
* [30 Seconds of React](https://github.com/30-seconds/30-seconds-of-react)
* [30 Seconds of Python](https://github.com/30-seconds/30-seconds-of-python-code)
* [30 Seconds of PHP](https://github.com/30-seconds/30-seconds-of-php-code)
* [30 Seconds of Knowledge](https://chrome.google.com/webstore/detail/30-seconds-of-knowledge/mmgplondnjekobonklacmemikcnhklla)
* [30 Seconds of Kotlin](https://github.com/IvanMwiruki/30-seconds-of-kotlin) _(unofficial)_

## Contents

###  List

<details>
<summary>View contents</summary>

* [`all_equal`](#all_equal)
* [`all_unique`](#all_unique)
* [`bifurcate`](#bifurcate)
* [`bifurcate_by`](#bifurcate_by)
* [`chunk`](#chunk)
* [`compact`](#compact)
* [`count_by`](#count_by)
* [`count_occurences`](#count_occurences)
* [`deep_flatten`](#deep_flatten)
* [`difference`](#difference)
* [`difference_by`](#difference_by)
* [`every`](#every)
* [`every_nth`](#every_nth)
* [`filter_non_unique`](#filter_non_unique)
* [`group_by`](#group_by)
* [`has_duplicates`](#has_duplicates)
* [`head`](#head)
* [`initial`](#initial)
* [`initialize_2d_list`](#initialize_2d_list)
* [`initialize_list_with_range`](#initialize_list_with_range)
* [`initialize_list_with_values`](#initialize_list_with_values)
* [`intersection`](#intersection)
* [`intersection_by`](#intersection_by)
* [`last`](#last)
* [`longest_item`](#longest_item)
* [`max_n`](#max_n)
* [`min_n`](#min_n)
* [`none`](#none)
* [`offset`](#offset)
* [`sample`](#sample)
* [`shuffle`](#shuffle)
* [`similarity`](#similarity)
* [`some`](#some)
* [`spread`](#spread)
* [`tail`](#tail)
* [`unique_elements`](#unique_elements)
* [`zip`](#zip)

</details>

###  Math

<details>
<summary>View contents</summary>

* [`average`](#average)
* [`average_by`](#average_by)
* [`clamp_number`](#clamp_number)
* [`digitize`](#digitize)
* [`factorial`](#factorial)
* [`fibonacci`](#fibonacci)
* [`gcd`](#gcd)
* [`in_range`](#in_range)
* [`is_divisible`](#is_divisible)
* [`is_even`](#is_even)
* [`is_odd`](#is_odd)
* [`lcm`](#lcm-)
* [`max_by`](#max_by)
* [`min_by`](#min_by)
* [`rads_to_degrees`](#rads_to_degrees)

</details>

###  Object

<details>
<summary>View contents</summary>

* [`keys_only`](#keys_only)
* [`map_values`](#map_values)
* [`values_only`](#values_only)

</details>

###  String

<details>
<summary>View contents</summary>

* [`byte_size`](#byte_size)
* [`capitalize`](#capitalize)
* [`capitalize_every_word`](#capitalize_every_word)
* [`decapitalize`](#decapitalize)
* [`is_anagram`](#is_anagram)
* [`is_lower_case`](#is_lower_case)
* [`is_upper_case`](#is_upper_case)
* [`palindrome`](#palindrome)
* [`split_lines`](#split_lines)

</details>

###  Utility

<details>
<summary>View contents</summary>

* [`cast_list`](#cast_list)

</details>


---

##  List


### all_equal

Check if all elements in a list are equal.

Use `[1:]` and `[:-1]` to compare all the values in the given list.

```python
```py
def all_equal(lst):
  return lst[1:] == lst[:-1]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### all_unique

Returns `True` if all the values in a flat list are unique, `False` otherwise.

Use `set()` on the given list to remove duplicates, compare its length with the length of the list.

```python
```py
def all_unique(lst):
  return len(lst) == len(set(lst))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### bifurcate

Splits values into two groups. 
If an element in `filter` is `True`, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.

Use list comprehension and `enumerate()` to add elements to groups, based on `filter`.

```python
```py
def bifurcate(lst, filter):
  return [
    [x for i,x in enumerate(lst) if filter[i] == True],
    [x for i,x in enumerate(lst) if filter[i] == False]
  ]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### bifurcate_by

Splits values into two groups according to a function, which specifies which group an element in the input list belongs to. 
If the function returns `True`, the element belongs to the first group; otherwise, it belongs to the second group.

Use list comprehension to add elements to groups, based on `fn`.

```python
```py
def bifurcate_by(lst, fn):
  return [
    [x for x in lst if fn(x)],
    [x for x in lst if not fn(x)]
  ]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### chunk

Chunks a list into smaller lists of a specified size.

Use `list()` and `range()` to create a list of the desired `size`.
Use `map()` on the list and fill it with splices of the given list.
Finally, return use created list.

```python
```py
from math import ceil

def chunk(lst, size):
  return list(
    map(lambda x: lst[x * size:x * size + size],
      list(range(0, ceil(len(lst) / size)))))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### compact

Removes falsey values from a list.

Use `filter()` to filter out falsey values (`False`, `None`, `0`, and `""`).

```python
```py
def compact(lst):
  return list(filter(bool, lst))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### count_by

Groups the elements of a list based on the given function and returns the count of elements in each group.

Use `map()` to map the values of the given list using the given function.
Iterate over the map and increase the element count each time it occurs.

```python
```py
def count_by(arr, fn=lambda x: x):
  key = {}
  for el in map(fn, arr):
    key[el] = 0 if el not in key else key[el]
    key[el] += 1
  return key
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### count_occurences

Counts the occurrences of a value in a list.

Increment a counter for every item in the list that has the given value and is of the same type.

```python
```py
def count_occurrences(lst, val):
  return len([x for x in lst if x == val and type(x) == type(val)])
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### deep_flatten

Deep flattens a list.

Use recursion. 
Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `list.extend()` with an empty list and the `spread` function to flatten a list.
Recursively flatten each element that is a list.

```python
```py
def spread(arg):
  ret = []
  for i in arg:
    if isinstance(i, list):
      ret.extend(i)
    else:
      ret.append(i)
  return ret

def deep_flatten(lst):
  result = []
  result.extend(
    spread(list(map(lambda x: deep_flatten(x) if type(x) == list else x, lst))))
  return result
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### difference

Returns the difference between two iterables.

Create a `set` from `b`, then use list comprehension on `a` to only keep values not contained in the previously created set, `_b`.

```python
```py
def difference(a, b):
  _b = set(b)
  return [item for item in a if item not in _b]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### difference_by

Returns the difference between two lists, after applying the provided function to each list element of both.

Create a `set` by applying `fn` to each element in `b`, then use list comprehension in combination with `fn` on `a` to only keep values not contained in the previously created set, `_b`.

```python
```py
def difference_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) not in _b]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### every

Returns `True` if the provided function returns `True` for every element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```python
```py
def every(lst, fn=lambda x: not not x):
  for el in lst:
    if not fn(el):
      return False
  return True
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### every_nth

Returns every nth element in a list.

Use `[1::nth]` to create a new list that contains every nth element of the given list.

```python
```py
def every_nth(lst, nth):
  return lst[1::nth]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### filter_non_unique

Filters out the non-unique values in a list.

Use list comprehension and `list.count()` to create a list containing only the unique values.

```python
```py
def filter_non_unique(lst):
  return [item for item in lst if lst.count(item) == 1]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### group_by

Groups the elements of a list based on the given function.

Use `list()` in combination with `map()` and `fn` to map the values of the list to the keys of an object.
Use list comprehension to map each element to the appropriate `key`.

```python
```py
def group_by(lst, fn):
  groups = {}
  for key in list(map(fn,lst)):
    groups[key] = [item for item in lst if fn(item) == key]
  return groups
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### has_duplicates

Returns `True` if there are duplicate values in a flast list, `False` otherwise.

Use `set()` on the given list to remove duplicates, compare its length with the length of the list.

```python
```py
def has_duplicates(lst):
  return len(lst) != len(set(lst))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### head

Returns the head of a list.

use `lst[0]` to return the first element of the passed list.

```python
```py
def head(lst):
  return lst[0]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### initial

Returns all the elements of a list except the last one.

Use `lst[0:-1]` to return all but the last element of the list.

```python
```py
def initial(lst):
  return lst[0:-1]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_2d_list

Initializes a 2D list of given width and height and value.

Use list comprehension and `range()` to generate `h` rows where each is a list with length `h`, initialized with `val`.
If `val` is not provided, default to `None`.

Explain briefly how the snippet works.

```python
```py
def initialize_2d_list(w,h, val = None):
  return [[val for x in range(w)] for y in range(h)]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_list_with_range

Initializes a list containing the numbers in the specified range where `start` and `end` are inclusive with their common difference `step`.

Use list comprehension and `range()` to generate a list of the appropriate length, filled with the desired values in the given range.
Omit `start` to use the default value of `0`.
Omit `step` to use the default value of `1`.

```python
```py
def initialize_list_with_range(end, start = 0, step = 1):
  return [x for x in range(start, end + 1, step)]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_list_with_values

Initializes and fills a list with the specified value.

Use list comprehension and `range()` to generate a list of length equal to `n`, filled with the desired values.
Omit `val` to use the default value of `0`.

```python
```py
def initialize_list_with_values(n, val = 0):
  return [val for x in range(n)]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### intersection

Returns a list of elements that exist in both lists.

Create a `set` from `b`, then use list comprehension on `a` to only keep values contained in both lists.

```python
```py
def intersection(a, b):
  _b = set(b)
  return [item for item in a if item in _b]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### intersection_by

Returns a list of elements that exist in both lists, after applying the provided function to each list element of both.

Create a `set` by applying `fn` to each element in `b`, then use list comprehension in combination with `fn` on `a` to only keep values contained in both lists.

```python
```py
def intersection_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) in _b]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### last

Returns the last element in a list.

use `lst[-1]` to return the last element of the passed list.

```python
```py
def last(lst):
  return lst[-1]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### longest_item

Takes any number of iterable objects or objects with a length property and returns the longest one. 
If multiple objects have the same length, the first one will be returned.

Use `max()` with `len` as the `key` to return the item with the greatest length.

```python
```py
def longest_item(*args):
  return max(args, key = len)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### max_n

Returns the `n` maximum elements from the provided list. 
If `n` is greater than or equal to the provided list's length, then return the original list (sorted in descending order).

Use `sorted() to sort the list, `[:n]` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element list.

```python
```py
def max_n(lst, n=1):
  return sorted(lst, reverse=True)[:n]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### min_n

Returns the `n` minimum elements from the provided list. 
If `n` is greater than or equal to the provided list's length, then return the original list (sorted in ascending order).

Use `sorted() to sort the list, `[:n]` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element list.

```python
```py
def min_n(lst, n=1):
  return sorted(lst, reverse=False)[:n]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### none

Returns `False` if the provided function returns `True` for at least one element in the list, `True` otherwise.

Iterate over the elements of the list to test if every element in the list returns `False` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `False`.

```python
```py
def none(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return False
  return True
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### offset

Moves the specified amount of elements to the end of the list.

Use `lst[offset:]` and `lst[:offset]` to get the two slices of the list and combine them before returning.

Explain briefly how the snippet works.

```python
```py
def offset(lst, offset):
  return lst[offset:] + lst[:offset]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### sample

Returns a random element from an array.

Use `randint()` to generate a random number that corresponds to an index in the list, return the element at that index.

```python
```py
from random import randint

def sample(lst):
  return lst[randint(0, len(lst) - 1)]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### shuffle

Randomizes the order of the values of an list, returning a new list.

Uses the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) to reorder the elements of the list.

```python
```py
from copy import deepcopy
from random import randint

def shuffle(lst):
  temp_lst = deepcopy(lst)
  m = len(temp_lst)
  while (m):
    m -= 1
    i = randint(0, m)
    temp_lst[m], temp_lst[i] = temp_lst[i], temp_lst[m]
  return temp_lst
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### similarity

Returns a list of elements that exist in both lists.

Use list comprehension on `a` to only keep values contained in both lists.

```python
```py
def similarity(a, b):
  return [item for item in a if item in b]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### some

Returns `True` if the provided function returns `True` for at least one element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```python
```py
def some(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return True
  return False
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### spread

Flattens a list, by spreading its elements into a new list.

Loop over elements, use `list.extend()` if the element is a list, `list.append()` otherwise.

```python
```py
def spread(arg):
  ret = []
  for i in arg:
    if isinstance(i, list):
      ret.extend(i)
    else:
      ret.append(i)
  return ret
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### tail

Returns all elements in a list except for the first one.

Return `lst[1:]` if the list's length is more than `1`, otherwise, return the whole list.

```python
```py
def tail(lst):
  return lst[1:] if len(lst) > 1 else lst
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### unique_elements

Returns the unique elements in a given list.

Create a `set` from the list to discard duplicated values, then return a `list` from it.

```python
```py
def unique_elements(li):
  return list(set(li))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### zip

Creates a list of elements, grouped based on the position in the original lists.


Use `max` combined with `list comprehension` to get the length of the longest list in the arguments. 
Loop for `max_length` times grouping elements. 
If lengths of `lists` vary, use `fill_value` (defaults to `None`). 

```python
```py
def zip(*args, fillvalue=None):
  max_length = max([len(lst) for lst in args])
  result = []
  for i in range(max_length):
    result.append([
      args[k][i] if i < len(args[k]) else fillvalue for k in range(len(args))
    ])
  return result
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Math


### average

Returns the average of two or more numbers.

Use `sum()` to sum all of the `args` provided, divide by `len(args)`.

```python
```py
def average(*args):
  return sum(args, 0.0) / len(args)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### average_by

Returns the average of a list, after mapping each element to a value using the provided function.

Use `map()` to map each element to the value returned by `fn`.
Use `sum()` to sum all of the mapped values, divide by `len(lst)`.

```python
```py
def average_by(lst, fn=lambda x: x):
  return sum(map(fn, lst), 0.0) / len(lst)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### clamp_number

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

If `num` falls within the range, return `num`. 
Otherwise, return the nearest number in the range.

```python
```py
def clamp_number(num,a,b):
  return max(min(num, max(a,b)),min(a,b))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### digitize

Converts a number to an array of digits.

Use `map()` combined with `int` on the string representation of `n` and return a list from the result.

```python
```py
def digitize(n):
  return list(map(int, str(n)))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### factorial

Calculates the factorial of a number.

Use recursion. 
If `num` is less than or equal to `1`, return `1`. 
Otherwise, return the product of `num` and the factorial of `num - 1`. 
Throws an exception if `num` is a negative or a floating point number.

```python
```py
def factorial(num):
  if not ((num >= 0) & (num % 1 == 0)):
    raise Exception(
      f"Number( {num} ) can't be floating point or negative ")
  return 1 if num == 0 else num * factorial(num - 1)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### fibonacci

Generates an array, containing the Fibonacci sequence, up until the nth term.

Starting with `0` and `1`, use `list.apoend() to add the sum of the last two numbers of the list to the end of the list, until the length of the list reaches `n`.  
If `n` is less or equal to `0`, return a list containing `0`.

```python
```py
def fibonacci(n):
  if n <= 0:
    return [0]

  sequence = [0, 1]
  while len(sequence) <= n:
    next_value = sequence[len(sequence) - 1] + sequence[len(sequence) - 2]
    sequence.append(next_value)

  return sequence
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### gcd

Calculates the greatest common divisor of a list of numbers.

Use `reduce()` and `math.gcd` over the given list.

```python
```py
from functools import reduce
import math

def gcd(numbers):
  return reduce(math.gcd, numbers)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### in_range

Checks if the given number falls within the given range.

Use arithmetic comparison to check if the given number is in the specified range.
If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```python
```py
def in_range(n, start, end = 0):
  if (start > end):
    end, start = start, end
  return start <= n <= end
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_divisible

Checks if the first numeric argument is divisible by the second one.

Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```python
```py
def is_divisible(dividend, divisor):
  return dividend % divisor == 0
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_even

Returns `True` if the given number is even, `False` otherwise.

Checks whether a number is odd or even using the modulo (`%`) operator. 
Returns `True` if the number is even, `False` if the number is odd.

```python
```py
def is_even(num):
  return num % 2 == 0
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_odd

Returns `True` if the given number is odd, `False` otherwise.

Checks whether a number is even or odd using the modulo (`%`) operator. 
Returns `True` if the number is odd, `False` if the number is even.

```python
```py
def is_odd(num):
  return num % 2 == `0`
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### lcm ![advanced](/advanced.svg)

Returns the least common multiple of two or more numbers.

Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `math.gcd()` and `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple.

```python
```py
from functools import reduce
import math

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

  def _lcm(x, y):
    return int(x * y / math.gcd(x, y))

  return reduce((lambda x, y: _lcm(x, y)), numbers)
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### max_by

Returns the maximum value of a list, after mapping each element to a value using the provided function.

use `map()` with `fn` to map each element to a value using the provided function, convert to a `list` and use `max()` to return the maximum value.

```python
```py
def max_by(lst, fn):
  return max(list(map(fn,lst)))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### min_by

Returns the minimum value of a list, after mapping each element to a value using the provided function.

use `map()` with `fn` to map each element to a value using the provided function, convert to a `list` and use `min()` to return the minimum value.

```python
```py
def min_by(lst, fn):
  return min(list(map(fn,lst)))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### rads_to_degrees

Converts an angle from radians to degrees.

Use `math.pi` and the radian to degree formula to convert the angle from radians to degrees.

```python
```py
import math

def rads_to_degrees(rad):
  return (rad * 180.0) / math.pi
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Object


### keys_only

Returns a flat list of all the keys in a flat dictionary.

Use `dict.keys()` to return the keys in the given dictionary.
Return a `list()` of the previous result.

```python
```py
def keys_only(flat_dict):
  return list(flat_dict.keys())
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### map_values

Creates an object with the same keys as the provided object and values generated by running the provided function for each value.

Use `dict.keys()` to iterate over the object's keys, assigning the values produced by `fn` to each key of a new object.

```python
```py
def map_values(obj, fn):
  ret = {}
  for key in obj.keys():
    ret[key] = fn(obj[key])
  return ret
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### values_only

Returns a flat list of all the values in a flat dictionary.

Use `dict.values()` to return the values in the given dictionary.
Return a `list()` of the previous result.

```python
```py
def values_only(dict):
  return list(flat_dict.values())
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

---

##  String


### byte_size

Returns the length of a string in bytes.

Use `string.encode('utf-8')` to encode the given string and return its length.

```python
```py
def byte_size(string):
  return len(string.encode('utf-8'))
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### capitalize

Capitalizes the first letter of a string.

Capitalize the first letter of the string and then add it with rest of the string. 
Omit the `lower_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to lowercase.

```python
```py
def capitalize(string, lower_rest=False):
  return string[:1].upper() + (string[1:].lower() if lower_rest else string[1:])
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### capitalize_every_word

Capitalizes the first letter of every word in a string.

Use `string.title()` to capitalize first letter of every word in the string.

```python
```py
def capitalize_every_word(string):
  return string.title()
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### decapitalize

Decapitalizes the first letter of a string.

Decapitalize the first letter of the string and then add it with rest of the string. 
Omit the `upper_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to uppercase.

```python
```py
def decapitalize(string, upper_rest=False):
  return str[:1].lower() + (str[1:].upper() if upper_rest else str[1:])
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_anagram

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

Use `str.replace()` to remove spaces from both strings.
Compare the lengths of the two strings, return `False` if they are not equal.
Use `sorted()` on both strings and compare the results.

```python
```py
def is_anagram(str1, str2):
  _str1, _str2 = str1.replace(" ", ""), str2.replace(" ", "")

  if len(_str1) != len(_str2):
    return False
  else:
    return sorted(_str1.lower()) == sorted(_str2.lower())
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_lower_case

Checks if a string is lower case.

Convert the given string to lower case, using `str.lower()` and compare it to the original.

```python
```py
def is_lower_case(string):
  return string == string.lower()
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### is_upper_case

Checks if a string is upper case.

Convert the given string to upper case, using `str.upper()` and compare it to the original.

```python
```py
def is_upper_case(string):
  return string == string.upper()
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### palindrome

Returns `True` if the given string is a palindrome, `False` otherwise.

Use `str.lower()` and `re.sub()` to convert to lowercase and  remove non-alphanumeric characters from the given string. 
Then, compare the new string with its reverse.

```python
```py
from re import sub

def palindrome(string):
  s = sub('[\W_]', '', string.lower())
  return s == s[::-1]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

### split_lines

Splits a multiline string into a list of lines.

Use `str.split()` and `'\n'` to match line breaks and create a list.

```python
```py
def split_lines(str):
  str.split('\n')
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Utility


### cast_list

Casts the provided value as an array if it's not one.

Use `isinstance()` to check if the given value is a list and return it as-is or encapsulated in a list accordingly.

```python
```py
def cast_list(val):
  return val if isinstance(val, list) else [val]
```
```

<details>
<summary>Examples</summary>

```python
undefined
```
</details>

<br>[⬆ Back to top](#contents)

## Collaborators

| [<img src="https://github.com/Chalarangelo.png" width="100px;"/>](https://github.com/Chalarangelo)<br/> [<sub>Angelos Chalaris</sub>](https://github.com/Chalarangelo) | [<img src="https://github.com/kriadmin.png" width="100px;"/>](https://github.com/kriadmin)<br/> [<sub>Rohit Tanwar</sub>](https://github.com/kriadmin) | [<img src="https://github.com/fejes713.png" width="100px;"/>](https://github.com/fejes713)<br/> [<sub>Stefan Feješ</sub>](https://github.com/fejes713) |

## Credits

*Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).*
*This README is built using [markdown-builder](https://github.com/30-seconds/markdown-builder).*

