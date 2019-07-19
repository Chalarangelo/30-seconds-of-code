### fermat_test

Checks if the number is prime or not. Returns True if passed number is prime, and False if not.

The function uses Fermat's theorem. 
First, it picks the number `A` in range `1`..`(n-1)`, then it checks if `A` to the power of `n-1` modulo `n` equals `1`. 
If not, the number is not prime, else it's pseudoprime with probability 1/2. Applying this test `k `times we have probability `1/(2^k)`.
For example, if the number passes the test `10` times, we have probability `0.00098`.

``` python
from random import randint


def fermat_test(n, k=100):
    if n <= 1:
        return False
    for i in range(k):
        a = randint(1, n - 1)
        if pow(a, n - 1, n) != 1:
            return False
    return True

```

``` python
fermat_test(0)  # False
fermat_test(1)  # False
fermat_test(561)  # False
fermat_test(41041)  # False
fermat_test(17)  # True
fermat_test(162259276829213363391578010288127)  # True
fermat_test(-1)  # False
```
