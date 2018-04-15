### keys_only

Function which accepts a dictionary of key value pairs and returns a new flat list of only the keys.

Uses the .items() function with a for loop on the dictionary to track both the key and value and returns a new list by appending the keys to it. Best used on 1 level-deep key:value pair dictionaries and not nested data-structures.

``` python
def keys_only(dict):
    lst = []
    for k, v in dict.items():
        lst.append(k)
    return lst
```

``` python
ages = {
     "Peter": 10,
     "Isabel": 11,
     "Anna": 9,
}
keys_only(ages) # ['Peter', 'Isabel', 'Anna']
```