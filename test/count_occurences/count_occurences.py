<<<<<<< HEAD
def count_occurences(arr, val):
    return reduce(
        (lambda x, y: x + 1 if y == val and type(y) == type(val) else x + 0),
        arr)
=======
from functools import reduce


def count_occurences(arr, val):
    return reduce(
        (lambda x, y: x + 1 if y == val and type(y) == type(val) else x + 0),
        arr)
>>>>>>> 7aed10cac32bcdd889b6b6d762cb0024dc1c73be
