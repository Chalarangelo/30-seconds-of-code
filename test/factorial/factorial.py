def factorial(num):
    if not ((num >= 0) & (num % 1 == 0)):
        raise Exception(
            f"Number( {num} ) can't be floating point or negative ")
    return 1 if num == 0 else num * factorial(num - 1)