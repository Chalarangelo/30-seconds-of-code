def spread(arg):
    ret = []
    for i in arg:
        if isinstance(i, list):
            ret.extend(i)
        else:
            ret.append(i)
    return ret


def deep_flatten(arr):
    result = []
    result.extend(
        spread(list(map(lambda x: deep(x) if type(x) == list else x, arr))))
    return result