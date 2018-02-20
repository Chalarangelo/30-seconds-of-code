def count_by(arr, fn=lambda x: x):
    key = {}
    for el in map(fn, arr):
        key[el] = 0 if not el in key else key[el]
        key[el] += 1
    return key