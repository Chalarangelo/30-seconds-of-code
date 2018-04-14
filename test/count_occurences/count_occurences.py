def count_occurrences(lst, val):
    return len([x for x in lst if x == val and type(x) == type(val)])