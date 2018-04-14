from copy import deepcopy


def min_n(lst, n=1):
    numbers = deepcopy(lst)
    numbers.sort()
    return numbers[:n]