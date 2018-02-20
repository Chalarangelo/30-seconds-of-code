from copy import deepcopy
from random import randint


def shuffle(arr):
    temp_arr = deepcopy(arr)
    m = len(temp_arr)
    while (m):
        m -= 1
        i = randint(0, m)
        temp_arr[m], temp_arr[i] = temp_arr[i], temp_arr[m]
    return temp_arr