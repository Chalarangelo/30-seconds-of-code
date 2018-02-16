from copy import deepcopy


def max_n(arr, n=1):
    numbers = deepcopy(arr)
    numbers.sort()
    numbers.reverse()
    return numbers[:n]