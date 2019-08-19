### keys_only

Function which accepts a dictionary of key value pairs and returns a new flat list of only the keys.

Uses the .keys() method of "dict" objects. dict.keys() returns a view object that displays a list of all the keys. Then, list(dict.keys()) returns a list that stores all the keys of a dict.

``` python
def keys_only(flat_dict):
    return list(flat_dict.keys())
```

``` python
ages = {
     "Peter": 10,
     "Isabel": 11,
     "Anna": 9,
}
keys_only(ages) # ['Peter', 'Isabel', 'Anna']
```