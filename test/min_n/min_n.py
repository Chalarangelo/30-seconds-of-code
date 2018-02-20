from copy import deepcopy


def min_n(arr, n=1):
    numbers = deepcopy(arr)
    numbers.sort()
    return numbers[:n]