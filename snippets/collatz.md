### Collatz algorithm

If n even then returns **n/2** otherwise (n is odd) **3n+1**.
It uses the ternary operator.

``` js
    const collatz = n => (n % 2 == 0) ? (n/2) : (3*n+1); 
    // collatz(8) --> 4
    // collatz(5) --> 16

```