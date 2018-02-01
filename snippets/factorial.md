### factorial

Calculates the factorial of a number.

Use recursion. If `num` is less than or equal to `1`, return `1`. Otherwise, return the product of `num` and the factorial of `num - 1`. Throws an exception if `num` is a negative or a floating point number.

```python
def factorial(num):
    if not ((num >= 0) & (num % 1 == 0)):
        raise Exception(
            f"Number( {num} ) can't be floating point or negative ")
    return 1 if num == 0 else num * factorial(num - 1)
```
``` python
factorial(6) # 720
```
