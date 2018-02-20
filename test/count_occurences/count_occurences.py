def count_occurences(arr, val):
    return reduce(
        (lambda x, y: x + 1 if y == val and type(y) == type(val) else x + 0),
        arr)