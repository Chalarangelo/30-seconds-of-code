### gcd

Calculates the greatest common divisor between two or more numbers/arrays.

The `helperGcdfunction` uses recursion. Base case is when `y` equals `0`. In this case, return `x`. Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

Uses the reduce function from the inbuild module `functools`. Also defines a method `spread` for javascript like spreading of arrays.

``` python
from functools import reduce
def spread(arg):
     ret = []
     for i in arg:
       if isinstance(i,list):
         ret.extend(i)
       else:
         ret.append(i)
     return ret
def gcd(*args):
    numbers = []
    numbers.extend(spread(list(args)))
    def helperGcd(x,y):
        return x if not y else gcd(y,x%y)
    return reduce((lambda x,y : helperGcd(x,y)),numbers)
```