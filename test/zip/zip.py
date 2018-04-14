def zip(*args, fillvalue=None):
    max_length = max([len(lst) for lst in args])
    result = []
    for i in range(max_length):
        result.append([
            args[k][i] if i < len(args[k]) else None for k in range(len(args))
        ])
    return result