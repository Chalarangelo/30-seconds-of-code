![Logo](/icon.png)

## 30-seconds-of-python

> Curated collection of useful Python snippets that you can understand in 30 seconds or less.

* Use <kbd>Ctrl</kbd> + <kbd>F</kbd> or <kbd>command</kbd> + <kbd>F</kbd> to search for a snippet.
* Contributions welcome, please read the [contribution guide](CONTRIBUTING.md).
* If you want to follow 30-seconds-of-code on social media, you can find us on [Facebook](https://www.facebook.com/30secondsofcode), [Instagram](https://www.instagram.com/30secondsofcode) and [Twitter](https://twitter.com/30secondsofcode).

#### Related projects

* [30 Seconds of code](https://github.com/30-seconds/30-seconds-of-code)
* [30 Seconds of CSS](https://30-seconds.github.io/30-seconds-of-css/)
* [30 Seconds of Interviews](https://30secondsofinterviews.org/)
* [30 Seconds of React](https://github.com/30-seconds/30-seconds-of-react)
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
* [`symmetric_difference`](#symmetric_difference)
* [`symmetric_difference_by`](#symmetric_difference_by)
* [`tail`](#tail)
* [`union`](#union)
* [`union_by`](#union_by)
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
* [`sum_by`](#sum_by)

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
* [`camel`](#camel)
* [`capitalize`](#capitalize)
* [`capitalize_every_word`](#capitalize_every_word)
* [`decapitalize`](#decapitalize)
* [`is_anagram`](#is_anagram)
* [`is_lower_case`](#is_lower_case)
* [`is_upper_case`](#is_upper_case)
* [`kebab`](#kebab)
* [`palindrome`](#palindrome)
* [`snake`](#snake)
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

```py
def all_equal(lst):
  return lst[1:] == lst[:-1]
```

<details>
<summary>Examples</summary>

```py
all_equal([1, 2, 3, 4, 5, 6]) # False
all_equal([1, 1, 1, 1]) # True
```
</details>

<br>[⬆ Back to top](#contents)

### all_unique

Returns `True` if all the values in a flat list are unique, `False` otherwise.

Use `set()` on the given list to remove duplicates, compare its length with the length of the list.

```py
def all_unique(lst):
  return len(lst) == len(set(lst))
```

<details>
<summary>Examples</summary>

```py
x = [1,2,3,4,5,6]
y = [1,2,2,3,4,5]
all_unique(x) # True
all_unique(y) # False
```
</details>

<br>[⬆ Back to top](#contents)

### bifurcate

Splits values into two groups. 
If an element in `filter` is `True`, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group.

Use list comprehension and `enumerate()` to add elements to groups, based on `filter`.

```py
def bifurcate(lst, filter):
  return [
    [x for i,x in enumerate(lst) if filter[i] == True],
    [x for i,x in enumerate(lst) if filter[i] == False]
  ]
```

<details>
<summary>Examples</summary>

```py
bifurcate(['beep', 'boop', 'foo', 'bar'], [True, True, False, True]) # [ ['beep', 'boop', 'bar'], ['foo'] ]
```
</details>

<br>[⬆ Back to top](#contents)

### bifurcate_by

Splits values into two groups according to a function, which specifies which group an element in the input list belongs to. 
If the function returns `True`, the element belongs to the first group; otherwise, it belongs to the second group.

Use list comprehension to add elements to groups, based on `fn`.

```py
def bifurcate_by(lst, fn):
  return [
    [x for x in lst if fn(x)],
    [x for x in lst if not fn(x)]
  ]
```

<details>
<summary>Examples</summary>

```py
bifurcate_by(['beep', 'boop', 'foo', 'bar'], lambda x: x[0] == 'b') # [ ['beep', 'boop', 'bar'], ['foo'] ]
```
</details>

<br>[⬆ Back to top](#contents)

### chunk

Chunks a list into smaller lists of a specified size.

Use `list()` and `range()` to create a list of the desired `size`.
Use `map()` on the list and fill it with splices of the given list.
Finally, return use created list.

```py
from math import ceil

def chunk(lst, size):
  return list(
    map(lambda x: lst[x * size:x * size + size],
      list(range(0, ceil(len(lst) / size)))))
```

<details>
<summary>Examples</summary>

```py
chunk([1,2,3,4,5],2) # [[1,2],[3,4],5]
```
</details>

<br>[⬆ Back to top](#contents)

### compact

Removes falsey values from a list.

Use `filter()` to filter out falsey values (`False`, `None`, `0`, and `""`).

```py
def compact(lst):
  return list(filter(bool, lst))
```

<details>
<summary>Examples</summary>

```py
compact([0, 1, False, 2, '', 3, 'a', 's', 34]) # [ 1, 2, 3, 'a', 's', 34 ]
```
</details>

<br>[⬆ Back to top](#contents)

### count_by

Groups the elements of a list based on the given function and returns the count of elements in each group.

Use `map()` to map the values of the given list using the given function.
Iterate over the map and increase the element count each time it occurs.

```py
def count_by(arr, fn=lambda x: x):
  key = {}
  for el in map(fn, arr):
    key[el] = 0 if el not in key else key[el]
    key[el] += 1
  return key
```

<details>
<summary>Examples</summary>

```py
from math import floor
count_by([6.1, 4.2, 6.3], floor) # {4: 1, 6: 2}
count_by(['one', 'two', 'three'], len) # {3: 2, 5: 1}
```
</details>

<br>[⬆ Back to top](#contents)

### count_occurences

Counts the occurrences of a value in a list.

Increment a counter for every item in the list that has the given value and is of the same type.

```py
def count_occurrences(lst, val):
  return len([x for x in lst if x == val and type(x) == type(val)])
```

<details>
<summary>Examples</summary>

```py
count_occurrences([1, 1, 2, 1, 2, 3], 1) # 3
```
</details>

<br>[⬆ Back to top](#contents)

### deep_flatten

Deep flattens a list.

Use recursion. 
Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `list.extend()` with an empty list and the `spread` function to flatten a list.
Recursively flatten each element that is a list.

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

<details>
<summary>Examples</summary>

```py
deep_flatten([1, [2], [[3], 4], 5]) # [1,2,3,4,5]
```
</details>

<br>[⬆ Back to top](#contents)

### difference

Returns the difference between two iterables.

Create a `set` from `b`, then use list comprehension on `a` to only keep values not contained in the previously created set, `_b`.

```py
def difference(a, b):
  _b = set(b)
  return [item for item in a if item not in _b]
```

<details>
<summary>Examples</summary>

```py
difference([1, 2, 3], [1, 2, 4]) # [3]
```
</details>

<br>[⬆ Back to top](#contents)

### difference_by

Returns the difference between two lists, after applying the provided function to each list element of both.

Create a `set` by applying `fn` to each element in `b`, then use list comprehension in combination with `fn` on `a` to only keep values not contained in the previously created set, `_b`.

```py
def difference_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) not in _b]
```

<details>
<summary>Examples</summary>

```py
from math import floor
difference_by([2.1, 1.2], [2.3, 3.4],floor) # [1.2]
difference_by([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], lambda v : v['x']) # [ { x: 2 } ]
```
</details>

<br>[⬆ Back to top](#contents)

### every

Returns `True` if the provided function returns `True` for every element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```py
def every(lst, fn=lambda x: not not x):
  for el in lst:
    if not fn(el):
      return False
  return True
```

<details>
<summary>Examples</summary>

```py
every([4, 2, 3], lambda x: x > 1) # True
every([1, 2, 3]) # True
```
</details>

<br>[⬆ Back to top](#contents)

### every_nth

Returns every nth element in a list.

Use `[nth-1::nth]` to create a new list that contains every nth element of the given list.

```py
def every_nth(lst, nth):
  return lst[nth-1::nth]
```

<details>
<summary>Examples</summary>

```py
every_nth([1, 2, 3, 4, 5, 6], 2) # [ 2, 4, 6 ]
```
</details>

<br>[⬆ Back to top](#contents)

### filter_non_unique

Filters out the non-unique values in a list.

Use list comprehension and `list.count()` to create a list containing only the unique values.

```py
def filter_non_unique(lst):
  return [item for item in lst if lst.count(item) == 1]
```

<details>
<summary>Examples</summary>

```py
filter_non_unique([1, 2, 2, 3, 4, 4, 5]) # [1, 3, 5]
```
</details>

<br>[⬆ Back to top](#contents)

### group_by

Groups the elements of a list based on the given function.

Use `list()` in combination with `map()` and `fn` to map the values of the list to the keys of an object.
Use list comprehension to map each element to the appropriate `key`.

```py
def group_by(lst, fn):
  groups = {}
  for key in list(map(fn,lst)):
    groups[key] = [item for item in lst if fn(item) == key]
  return groups
```

<details>
<summary>Examples</summary>

```py
import math
group_by([6.1, 4.2, 6.3], math.floor); # {4: [4.2], 6: [6.1, 6.3]}
group_by(['one', 'two', 'three'], 'length'); # {3: ['one', 'two'], 5: ['three']}
```
</details>

<br>[⬆ Back to top](#contents)

### has_duplicates

Returns `True` if there are duplicate values in a flast list, `False` otherwise.

Use `set()` on the given list to remove duplicates, compare its length with the length of the list.

```py
def has_duplicates(lst):
  return len(lst) != len(set(lst))
```

<details>
<summary>Examples</summary>

```py
x = [1,2,3,4,5,5]
y = [1,2,3,4,5]
has_duplicates(x) # True
has_duplicates(y) # False
```
</details>

<br>[⬆ Back to top](#contents)

### head

Returns the head of a list.

use `lst[0]` to return the first element of the passed list.

```py
def head(lst):
  return lst[0]
```

<details>
<summary>Examples</summary>

```py
head([1, 2, 3]); # 1
```
</details>

<br>[⬆ Back to top](#contents)

### initial

Returns all the elements of a list except the last one.

Use `lst[0:-1]` to return all but the last element of the list.

```py
def initial(lst):
  return lst[0:-1]
```

<details>
<summary>Examples</summary>

```py
initial([1, 2, 3]); # [1,2]
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_2d_list

Initializes a 2D list of given width and height and value.

Use list comprehension and `range()` to generate `h` rows where each is a list with length `h`, initialized with `val`.
If `val` is not provided, default to `None`.

Explain briefly how the snippet works.

```py
def initialize_2d_list(w,h, val = None):
  return [[val for x in range(w)] for y in range(h)]
```

<details>
<summary>Examples</summary>

```py
initialize_2d_list(2, 2, 0) # [[0,0], [0,0]]
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_list_with_range

Initializes a list containing the numbers in the specified range where `start` and `end` are inclusive with their common difference `step`.

Use `list` and `range()` to generate a list of the appropriate length, filled with the desired values in the given range.
Omit `start` to use the default value of `0`.
Omit `step` to use the default value of `1`.

```py
def initialize_list_with_range(end, start = 0, step = 1):
  return list(range(start, end + 1, step))
```

<details>
<summary>Examples</summary>

```py
initialize_list_with_range(5) # [0, 1, 2, 3, 4, 5]
initialize_list_with_range(7,3) # [3, 4, 5, 6, 7]
initialize_list_with_range(9,0,2) # [0, 2, 4, 6, 8]
```
</details>

<br>[⬆ Back to top](#contents)

### initialize_list_with_values

Initializes and fills a list with the specified value.

Use list comprehension and `range()` to generate a list of length equal to `n`, filled with the desired values.
Omit `val` to use the default value of `0`.

```py
def initialize_list_with_values(n, val = 0):
  return [val for x in range(n)]
```

<details>
<summary>Examples</summary>

```py
initialize_list_with_values(5, 2) # [2, 2, 2, 2, 2]
```
</details>

<br>[⬆ Back to top](#contents)

### intersection

Returns a list of elements that exist in both lists.

Create a `set` from `b`, then use list comprehension on `a` to only keep values contained in both lists.

```py
def intersection(a, b):
  _b = set(b)
  return [item for item in a if item in _b]
```

<details>
<summary>Examples</summary>

```py
intersection([1, 2, 3], [4, 3, 2]) # [2, 3]
```
</details>

<br>[⬆ Back to top](#contents)

### intersection_by

Returns a list of elements that exist in both lists, after applying the provided function to each list element of both.

Create a `set` by applying `fn` to each element in `b`, then use list comprehension in combination with `fn` on `a` to only keep values contained in both lists.

```py
def intersection_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) in _b]
```

<details>
<summary>Examples</summary>

```py
from math import floor
intersection_by([2.1, 1.2], [2.3, 3.4],floor) # [2.1]
```
</details>

<br>[⬆ Back to top](#contents)

### last

Returns the last element in a list.

use `lst[-1]` to return the last element of the passed list.

```py
def last(lst):
  return lst[-1]
```

<details>
<summary>Examples</summary>

```py
last([1, 2, 3]) # 3
```
</details>

<br>[⬆ Back to top](#contents)

### longest_item

Takes any number of iterable objects or objects with a length property and returns the longest one. 
If multiple objects have the same length, the first one will be returned.

Use `max()` with `len` as the `key` to return the item with the greatest length.

```py
def longest_item(*args):
  return max(args, key = len)
```

<details>
<summary>Examples</summary>

```py
longest_item('this', 'is', 'a', 'testcase') # 'testcase'
longest_item([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]) # [1, 2, 3, 4, 5]
longest_item([1, 2, 3], 'foobar') # 'foobar'
```
</details>

<br>[⬆ Back to top](#contents)

### max_n

Returns the `n` maximum elements from the provided list. 
If `n` is greater than or equal to the provided list's length, then return the original list (sorted in descending order).

Use `sorted()` to sort the list, `[:n]` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element list.

```py
def max_n(lst, n=1):
  return sorted(lst, reverse=True)[:n]
```

<details>
<summary>Examples</summary>

```py
max_n([1, 2, 3]) # [3]
max_n([1, 2, 3], 2) # [3,2]
```
</details>

<br>[⬆ Back to top](#contents)

### min_n

Returns the `n` minimum elements from the provided list. 
If `n` is greater than or equal to the provided list's length, then return the original list (sorted in ascending order).

Use `sorted() to sort the list, `[:n]` to get the specified number of elements.
Omit the second argument, `n`, to get a one-element list.

```py
def min_n(lst, n=1):
  return sorted(lst, reverse=False)[:n]
```

<details>
<summary>Examples</summary>

```py
min_n([1, 2, 3]) # [1]
min_n([1, 2, 3], 2) # [1,2]
```
</details>

<br>[⬆ Back to top](#contents)

### none

Returns `False` if the provided function returns `True` for at least one element in the list, `True` otherwise.

Iterate over the elements of the list to test if every element in the list returns `False` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `False`.

```py
def none(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return False
  return True
```

<details>
<summary>Examples</summary>

```py
none([0, 1, 2, 0], lambda x: x >= 2 ) # False
none([0, 0, 0]) # True
```
</details>

<br>[⬆ Back to top](#contents)

### offset

Moves the specified amount of elements to the end of the list.

Use `lst[offset:]` and `lst[:offset]` to get the two slices of the list and combine them before returning.

Explain briefly how the snippet works.

```py
def offset(lst, offset):
  return lst[offset:] + lst[:offset]
```

<details>
<summary>Examples</summary>

```py
offset([1, 2, 3, 4, 5], 2) # [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2) # [4, 5, 1, 2, 3]
```
</details>

<br>[⬆ Back to top](#contents)

### sample

Returns a random element from an array.

Use `randint()` to generate a random number that corresponds to an index in the list, return the element at that index.

```py
from random import randint

def sample(lst):
  return lst[randint(0, len(lst) - 1)]
```

<details>
<summary>Examples</summary>

```py
sample([3, 7, 9, 11]) # 9
```
</details>

<br>[⬆ Back to top](#contents)

### shuffle

Randomizes the order of the values of an list, returning a new list.

Uses the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) to reorder the elements of the list.

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

<details>
<summary>Examples</summary>

```py
foo = [1,2,3]
shuffle(foo) # [2,3,1] , foo = [1,2,3]
```
</details>

<br>[⬆ Back to top](#contents)

### similarity

Returns a list of elements that exist in both lists.

Use list comprehension on `a` to only keep values contained in both lists.

```py
def similarity(a, b):
  return [item for item in a if item in b]
```

<details>
<summary>Examples</summary>

```py
similarity([1, 2, 3], [1, 2, 4]) # [1, 2]
```
</details>

<br>[⬆ Back to top](#contents)

### some

Returns `True` if the provided function returns `True` for at least one element in the list, `False` otherwise.

Iterate over the elements of the list to test if every element in the list returns `True` based on `fn`.
Omit the seconds argument, `fn`, to check if all elements are `True`.

```py
def some(lst, fn=lambda x: not not x):
  for el in lst:
    if fn(el):
      return True
  return False
```

<details>
<summary>Examples</summary>

```py
some([0, 1, 2, 0], lambda x: x >= 2 ) # True
some([0, 0, 1, 0]) # True
```
</details>

<br>[⬆ Back to top](#contents)

### spread

Flattens a list, by spreading its elements into a new list.

Loop over elements, use `list.extend()` if the element is a list, `list.append()` otherwise.

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

<details>
<summary>Examples</summary>

```py
spread([1,2,3,[4,5,6],[7],8,9]) # [1,2,3,4,5,6,7,8,9]
```
</details>

<br>[⬆ Back to top](#contents)

### symmetric_difference

Returns the symmetric difference between two iterables, without filtering out duplicate values.

Create a `set` from each list, then use list comprehension on each one to only keep values not contained in the previously created set of the other.

```py
def symmetric_difference(a, b):
  _a, _b = set(a), set(b)
  return [item for item in a if item not in _b] + [item for item in b if item not in _a]
```

<details>
<summary>Examples</summary>

```py
symmetric_difference([1, 2, 3], [1, 2, 4]) # [3, 4]
```
</details>

<br>[⬆ Back to top](#contents)

### symmetric_difference_by

Returns the symmetric difference between two lists, after applying the provided function to each list element of both.

Create a `set` by applying `fn` to each element in every list, then use list comprehension in combination with `fn` on each one to only keep values not contained in the previously created set of the other.

```py
def symmetric_difference_by(a, b, fn):
  _a, _b = set(map(fn, a)), set(map(fn, b))
  return [item for item in a if fn(item) not in _b] + [item for item in b if fn(item) not in _a]
```

<details>
<summary>Examples</summary>

```py
from math import floor
symmetric_difference_by([2.1, 1.2], [2.3, 3.4],floor) # [1.2, 3.4]
```
</details>

<br>[⬆ Back to top](#contents)

### tail

Returns all elements in a list except for the first one.

Return `lst[1:]` if the list's length is more than `1`, otherwise, return the whole list.

```py
def tail(lst):
  return lst[1:] if len(lst) > 1 else lst
```

<details>
<summary>Examples</summary>

```py
tail([1, 2, 3]); # [2,3]
tail([1]); # [1]
```
</details>

<br>[⬆ Back to top](#contents)

### union

Returns every element that exists in any of the two lists once.

Create a `set` with all values of `a` and `b` and convert to a `list`.

```py
def union(a,b):
  return list(set(a + b))
```

<details>
<summary>Examples</summary>

```py
union([1, 2, 3], [4, 3, 2]) # [1,2,3,4]
```
</details>

<br>[⬆ Back to top](#contents)

### union_by

Returns every element that exists in any of the two lists once, after applying the provided function to each element of both.

Create a `set` by applying `fn` to each element in `a`, then use list comprehension in combination with `fn` on `b` to only keep values not contained in the previously created set, `_a`.
Finally, create a `set` from the previous result and `a` and transform it into a `list`

```py
def union_by(a,b,fn):
  _a = set(map(fn, a))
  return list(set(a + [item for item in b if fn(item) not in _a]))
```

<details>
<summary>Examples</summary>

```py
from math import floor
union_by([2.1], [1.2, 2.3], floor) # [2.1, 1.2]
```
</details>

<br>[⬆ Back to top](#contents)

### unique_elements

Returns the unique elements in a given list.

Create a `set` from the list to discard duplicated values, then return a `list` from it.

```py
def unique_elements(li):
  return list(set(li))
```

<details>
<summary>Examples</summary>

```py
unique_elements([1, 2, 2, 3, 4, 3]) # [1, 2, 3, 4]
```
</details>

<br>[⬆ Back to top](#contents)

### zip

Creates a list of elements, grouped based on the position in the original lists.


Use `max` combined with `list comprehension` to get the length of the longest list in the arguments. 
Loop for `max_length` times grouping elements. 
If lengths of `lists` vary, use `fill_value` (defaults to `None`). 

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

<details>
<summary>Examples</summary>

```py
zip(['a', 'b'], [1, 2], [True, False]) # [['a', 1, True], ['b', 2, False]]
zip(['a'], [1, 2], [True, False]) # [['a', 1, True], [None, 2, False]]
zip(['a'], [1, 2], [True, False], fill_value = '_') # [['a', 1, True], ['_', 2, False]]
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Math


### average

Returns the average of two or more numbers.

Use `sum()` to sum all of the `args` provided, divide by `len(args)`.

```py
def average(*args):
  return sum(args, 0.0) / len(args)
```

<details>
<summary>Examples</summary>

```py
average(*[1, 2, 3]) # 2.0
average(1, 2, 3) # 2.0
```
</details>

<br>[⬆ Back to top](#contents)

### average_by

Returns the average of a list, after mapping each element to a value using the provided function.

Use `map()` to map each element to the value returned by `fn`.
Use `sum()` to sum all of the mapped values, divide by `len(lst)`.

```py
def average_by(lst, fn=lambda x: x):
  return sum(map(fn, lst), 0.0) / len(lst)
```

<details>
<summary>Examples</summary>

```py
average_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda x: x['n']) # 5.0
```
</details>

<br>[⬆ Back to top](#contents)

### clamp_number

Clamps `num` within the inclusive range specified by the boundary values `a` and `b`.

If `num` falls within the range, return `num`. 
Otherwise, return the nearest number in the range.

```py
def clamp_number(num,a,b):
  return max(min(num, max(a,b)),min(a,b))
```

<details>
<summary>Examples</summary>

```py
clamp_number(2, 3, 5) # 3
clamp_number(1, -1, -5) # -1
```
</details>

<br>[⬆ Back to top](#contents)

### digitize

Converts a number to an array of digits.

Use `map()` combined with `int` on the string representation of `n` and return a list from the result.

```py
def digitize(n):
  return list(map(int, str(n)))
```

<details>
<summary>Examples</summary>

```py
digitize(123) # [1, 2, 3]
```
</details>

<br>[⬆ Back to top](#contents)

### factorial

Calculates the factorial of a number.

Use recursion. 
If `num` is less than or equal to `1`, return `1`. 
Otherwise, return the product of `num` and the factorial of `num - 1`. 
Throws an exception if `num` is a negative or a floating point number.

```py
def factorial(num):
  if not ((num >= 0) & (num % 1 == 0)):
    raise Exception(
      f"Number( {num} ) can't be floating point or negative ")
  return 1 if num == 0 else num * factorial(num - 1)
```

<details>
<summary>Examples</summary>

```py
factorial(6) # 720
```
</details>

<br>[⬆ Back to top](#contents)

### fibonacci

Generates an array, containing the Fibonacci sequence, up until the nth term.

Starting with `0` and `1`, use `list.apoend() to add the sum of the last two numbers of the list to the end of the list, until the length of the list reaches `n`.  
If `n` is less or equal to `0`, return a list containing `0`.

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

<details>
<summary>Examples</summary>

```py
fibonacci(7) # [0, 1, 1, 2, 3, 5, 8, 13]
```
</details>

<br>[⬆ Back to top](#contents)

### gcd

Calculates the greatest common divisor of a list of numbers.

Use `reduce()` and `math.gcd` over the given list.

```py
from functools import reduce
import math

def gcd(numbers):
  return reduce(math.gcd, numbers)
```

<details>
<summary>Examples</summary>

```py
gcd([8,36,28]) # 4
```
</details>

<br>[⬆ Back to top](#contents)

### in_range

Checks if the given number falls within the given range.

Use arithmetic comparison to check if the given number is in the specified range.
If the second parameter, `end`, is not specified, the range is considered to be from `0` to `start`.

```py
def in_range(n, start, end = 0):
  if (start > end):
    end, start = start, end
  return start <= n <= end
```

<details>
<summary>Examples</summary>

```py
in_range(3, 2, 5); # True
in_range(3, 4); # True
in_range(2, 3, 5); # False
in_range(3, 2); # False
```
</details>

<br>[⬆ Back to top](#contents)

### is_divisible

Checks if the first numeric argument is divisible by the second one.

Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```py
def is_divisible(dividend, divisor):
  return dividend % divisor == 0
```

<details>
<summary>Examples</summary>

```py
is_divisible(6, 3) # True
```
</details>

<br>[⬆ Back to top](#contents)

### is_even

Returns `True` if the given number is even, `False` otherwise.

Checks whether a number is odd or even using the modulo (`%`) operator. 
Returns `True` if the number is even, `False` if the number is odd.

```py
def is_even(num):
  return num % 2 == 0
```

<details>
<summary>Examples</summary>

```py
is_even(3) # False
```
</details>

<br>[⬆ Back to top](#contents)

### is_odd

Returns `True` if the given number is odd, `False` otherwise.

Checks whether a number is even or odd using the modulo (`%`) operator. 
Returns `True` if the number is odd, `False` if the number is even.

```py
def is_odd(num):
  return num % 2 != 0
```

<details>
<summary>Examples</summary>

```py
is_odd(3) # True
```
</details>

<br>[⬆ Back to top](#contents)

### lcm ![advanced](/advanced.svg)

Returns the least common multiple of two or more numbers.

Define a function, `spread`, that uses either `list.extend()` or `list.append()` on each element in a list to flatten it.
Use `math.gcd()` and `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple.

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

<details>
<summary>Examples</summary>

```py
lcm(12, 7) # 84
lcm([1, 3, 4], 5) # 60
```
</details>

<br>[⬆ Back to top](#contents)

### max_by

Returns the maximum value of a list, after mapping each element to a value using the provided function.

Use `map()` with `fn` to map each element to a value using the provided function, convert to a `list` and use `max()` to return the maximum value.

```py
def max_by(lst, fn):
  return max(list(map(fn,lst)))
```

<details>
<summary>Examples</summary>

```py
max_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 8
```
</details>

<br>[⬆ Back to top](#contents)

### min_by

Returns the minimum value of a list, after mapping each element to a value using the provided function.

Use `map()` with `fn` to map each element to a value using the provided function, convert to a `list` and use `min()` to return the minimum value.

```py
def min_by(lst, fn):
  return min(list(map(fn,lst)))
```

<details>
<summary>Examples</summary>

```py
min_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 2
```
</details>

<br>[⬆ Back to top](#contents)

### rads_to_degrees

Converts an angle from radians to degrees.

Use `math.pi` and the radian to degree formula to convert the angle from radians to degrees.

```py
import math

def rads_to_degrees(rad):
  return (rad * 180.0) / math.pi
```

<details>
<summary>Examples</summary>

```py
import math
rads_to_degrees(math.pi / 2) # 90.0
```
</details>

<br>[⬆ Back to top](#contents)

### sum_by

Returns the sum of a list, after mapping each element to a value using the provided function.

Use `map()` with `fn` to map each element to a value using the provided function, convert to a `list` and use `sum()` to return the sum of the values.

```py
def sum_by(lst, fn):
  return sum(list(map(fn,lst)))
```

<details>
<summary>Examples</summary>

```py
sum_by([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], lambda v : v['n']) # 20
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Object


### keys_only

Returns a flat list of all the keys in a flat dictionary.

Use `dict.keys()` to return the keys in the given dictionary.
Return a `list()` of the previous result.

```py
def keys_only(flat_dict):
  return list(flat_dict.keys())
```

<details>
<summary>Examples</summary>

```py
ages = {
  "Peter": 10,
  "Isabel": 11,
  "Anna": 9,
}
keys_only(ages) # ['Peter', 'Isabel', 'Anna']
```
</details>

<br>[⬆ Back to top](#contents)

### map_values

Creates an object with the same keys as the provided object and values generated by running the provided function for each value.

Use `dict.keys()` to iterate over the object's keys, assigning the values produced by `fn` to each key of a new object.

```py
def map_values(obj, fn):
  ret = {}
  for key in obj.keys():
    ret[key] = fn(obj[key])
  return ret
```

<details>
<summary>Examples</summary>

```py
users = {
  'fred': { 'user': 'fred', 'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
}

map_values(users, lambda u : u['age']) # {'fred': 40, 'pebbles': 1}
```
</details>

<br>[⬆ Back to top](#contents)

### values_only

Returns a flat list of all the values in a flat dictionary.

Use `dict.values()` to return the values in the given dictionary.
Return a `list()` of the previous result.

```py
def values_only(dict):
  return list(flat_dict.values())
```

<details>
<summary>Examples</summary>

```py
ages = {
  "Peter": 10,
  "Isabel": 11,
  "Anna": 9,
}
values_only(ages) # [10, 11, 9]
```
</details>

<br>[⬆ Back to top](#contents)

---

##  String


### byte_size

Returns the length of a string in bytes.

Use `string.encode('utf-8')` to encode the given string and return its length.

```py
def byte_size(string):
  return len(string.encode('utf-8'))
```

<details>
<summary>Examples</summary>

```py
byte_size('😀') # 4
byte_size('Hello World') # 11
```
</details>

<br>[⬆ Back to top](#contents)

### camel

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word, using a regexp, `title()` and `lower`.

```py
import re

def camel(s):
  s = re.sub(r"(\s|_|-)+", " ", s).title().replace(" ", "")
  return s[0].lower() + s[1:]
```

<details>
<summary>Examples</summary>

```py
camel('some_database_field_name'); # 'someDatabaseFieldName'
camel('Some label that needs to be camelized'); # 'someLabelThatNeedsToBeCamelized'
camel('some-javascript-property'); # 'someJavascriptProperty'
camel('some-mixed_string with spaces_underscores-and-hyphens'); # 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
</details>

<br>[⬆ Back to top](#contents)

### capitalize

Capitalizes the first letter of a string.

Capitalize the first letter of the string and then add it with rest of the string. 
Omit the `lower_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to lowercase.

```py
def capitalize(string, lower_rest=False):
  return string[:1].upper() + (string[1:].lower() if lower_rest else string[1:])
```

<details>
<summary>Examples</summary>

```py
capitalize('fooBar') # 'FooBar'
capitalize('fooBar', True) # 'Foobar'
```
</details>

<br>[⬆ Back to top](#contents)

### capitalize_every_word

Capitalizes the first letter of every word in a string.

Use `string.title()` to capitalize first letter of every word in the string.

```py
def capitalize_every_word(string):
  return string.title()
```

<details>
<summary>Examples</summary>

```py
capitalize_every_word('hello world!') # 'Hello World!'
```
</details>

<br>[⬆ Back to top](#contents)

### decapitalize

Decapitalizes the first letter of a string.

Decapitalize the first letter of the string and then add it with rest of the string. 
Omit the `upper_rest` parameter to keep the rest of the string intact, or set it to `True` to convert to uppercase.

```py
def decapitalize(string, upper_rest=False):
  return str[:1].lower() + (str[1:].upper() if upper_rest else str[1:])
```

<details>
<summary>Examples</summary>

```py
decapitalize('FooBar') # 'fooBar'
decapitalize('FooBar', True) # 'fOOBAR'
```
</details>

<br>[⬆ Back to top](#contents)

### is_anagram

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

Use `str.replace()` to remove spaces from both strings.
Compare the lengths of the two strings, return `False` if they are not equal.
Use `sorted()` on both strings and compare the results.

```py
def is_anagram(str1, str2):
  _str1, _str2 = str1.replace(" ", ""), str2.replace(" ", "")

  if len(_str1) != len(_str2):
    return False
  else:
    return sorted(_str1.lower()) == sorted(_str2.lower())
```

<details>
<summary>Examples</summary>

```py
is_anagram("anagram", "Nag a ram")  # True
```
</details>

<br>[⬆ Back to top](#contents)

### is_lower_case

Checks if a string is lower case.

Convert the given string to lower case, using `str.lower()` and compare it to the original.

```py
def is_lower_case(string):
  return string == string.lower()
```

<details>
<summary>Examples</summary>

```py
is_lower_case('abc') # True
is_lower_case('a3@$') # True
is_lower_case('Ab4') # False
```
</details>

<br>[⬆ Back to top](#contents)

### is_upper_case

Checks if a string is upper case.

Convert the given string to upper case, using `str.upper()` and compare it to the original.

```py
def is_upper_case(string):
  return string == string.upper()
```

<details>
<summary>Examples</summary>

```py
is_upper_case('ABC') # True
is_upper_case('a3@$') # False
is_upper_case('aB4') # False
```
</details>

<br>[⬆ Back to top](#contents)

### kebab

Converts a string to kebab case.

Break the string into words and combine them adding `-` as a separator, using a regexp.

```py
import re

def kebab(str):
  return re.sub(r"(\s|_|-)+","-",
    re.sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: mo.group(0).lower(),str)
  )
```

<details>
<summary>Examples</summary>

```py
kebab('camelCase'); # 'camel-case'
kebab('some text'); # 'some-text'
kebab('some-mixed_string With spaces_underscores-and-hyphens'); # 'some-mixed-string-with-spaces-underscores-and-hyphens'
kebab('AllThe-small Things'); # "all-the-small-things"
```
</details>

<br>[⬆ Back to top](#contents)

### palindrome

Returns `True` if the given string is a palindrome, `False` otherwise.

Use `str.lower()` and `re.sub()` to convert to lowercase and  remove non-alphanumeric characters from the given string. 
Then, compare the new string with its reverse.

```py
from re import sub

def palindrome(string):
  s = sub('[\W_]', '', string.lower())
  return s == s[::-1]
```

<details>
<summary>Examples</summary>

```py
palindrome('taco cat') # True
```
</details>

<br>[⬆ Back to top](#contents)

### snake

Converts a string to snake case.

Break the string into words and combine them adding `_-_` as a separator, using a regexp.

```py
import re

def snake(str):
  return re.sub(r"(\s|_|-)+","-",
    re.sub(r"[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+",
    lambda mo: mo.group(0).lower(),str)
  )
```

<details>
<summary>Examples</summary>

```py
snake('camelCase'); # 'camel_case'
snake('some text'); # 'some_text'
snake('some-mixed_string With spaces_underscores-and-hyphens'); # 'some_mixed_string_with_spaces_underscores_and_hyphens'
snake('AllThe-small Things'); # "all_the_smal_things"
```
</details>

<br>[⬆ Back to top](#contents)

### split_lines

Splits a multiline string into a list of lines.

Use `str.split()` and `'\n'` to match line breaks and create a list.

```py
def split_lines(str):
  return str.split('\n')
```

<details>
<summary>Examples</summary>

```py
split_lines('This\nis a\nmultiline\nstring.\n') # 'This\nis a\nmultiline\nstring.\n'
```
</details>

<br>[⬆ Back to top](#contents)

---

##  Utility


### cast_list

Casts the provided value as an array if it's not one.

Use `isinstance()` to check if the given value is a list and return it as-is or encapsulated in a list accordingly.

```py
def cast_list(val):
  return val if isinstance(val, list) else [val]
```

<details>
<summary>Examples</summary>

```py
cast_list('foo'); # ['foo']
cast_list([1]); # [1]
```
</details>

<br>[⬆ Back to top](#contents)

## Collaborators

| [<img src="https://github.com/Chalarangelo.png" width="100px;"/>](https://github.com/Chalarangelo)<br/> [<sub>Angelos Chalaris</sub>](https://github.com/Chalarangelo) | [<img src="https://github.com/fejes713.png" width="100px;"/>](https://github.com/fejes713)<br/> [<sub>Stefan Feješ</sub>](https://github.com/fejes713) | [<img src="https://github.com/kriadmin.png" width="100px;"/>](https://github.com/kriadmin)<br/> [<sub>Rohit Tanwar</sub>](https://github.com/kriadmin) | 
| --- | --- | --- |

## Credits

*This README is built using [markdown-builder](https://github.com/30-seconds/markdown-builder).*

