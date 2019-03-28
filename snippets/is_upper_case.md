### is_upper_case

Checks if a string is upper case.

Convert the given string to upper case, using `str.upper()` method and compare it to the original.

```python
def is_upper_case(string):
    return string == string.upper()
```

```python
is_upper_case('ABC') # True
is_upper_case('a3@$') # False
is_upper_case('aB4') # False
```
