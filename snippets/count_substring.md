---
title: count_substring
tags: list,function,intermediate,string
---

Returns the number of a substring pattern in the given string.

- Get the lengths of the string and sub string
- Loop through the length of the substring, check if the string's parted part is equals to the substring then increase the count

```python
def count_substring(string, sub_string):
    count = 0
    str_length = len(string)
    sub_length = len(sub_string)
    for i in range(str_length):
        if string[i:i+sub_length] == sub_string:
            count += 1
    return count
```

```python
print(count_substring("abcabacbcbabacabacbacabcabcabcacbacbacbacbacbac", 'abc')) # returns 4
print(count_substring("abcabacbcbabacabacbacabcabcabcacbacbacbacbacbac", 'ca')) 
 # return 6
```
