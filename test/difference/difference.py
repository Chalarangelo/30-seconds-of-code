def difference(a, b):
    b = set(b)
    return [item for item in a if item not in b]