### countVowels

Retuns `number` of vowels in provided `string`.

Use a regular expression to count the number of vowels `(A, E, I, O, U)` in a string.

```python 
import re


def countVowels(str):
    return len(len(re.findall(r'[aeiou]', 'bcedfidsnoxluAEIO', re.IGNORECASE)))

```

``` python
countVowels('foobar') # 3
countVowels('gym') # 0
```