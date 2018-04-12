### is_lower_case

Checks if a string is lower case.

Convert the given string to lower case, using `str.lower()` method and compare it to the original.

```python
def is_lower_case(string):
    return string == string.lower()
```

```python
is_lower_case('abc') # True
is_lower_case('a3@$') # True
is_lower_case('Ab4') # False
```