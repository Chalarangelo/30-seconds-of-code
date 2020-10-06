---
title: numberToString
tags: math, intermediate
---

Converts a positive int to its string representation.

- Use `recursion` on an input number (positive integer) and substract from its value, to write it in letters.


```js
const numberToString = number =>
  {
    const stringLookup = [
      {key: 1000000000000000, value: 'quadrillion'},
      {key: 1000000000000, value: 'trillion'},
      {key: 1000000000, value: 'billion'},
      {key: 1000000, value: 'million'},
      {key: 1000, value: 'thousand'},
      {key: 100, value: 'hundred'},
      {key: 90, value: 'ninety'},
      {key: 80, value: 'eighty'},
      {key: 70, value: 'seventy'},
      {key: 60, value: 'sixty'},
      {key: 50, value: 'fifty'},
      {key: 40, value: 'forty'},
      {key: 30, value: 'thirty'},
      {key: 20, value: 'twenty'},
      {key: 19, value: 'nineteen'},
      {key: 18, value: 'eighteen'},
      {key: 17, value: 'seventeen'},
      {key: 16, value: 'sixteen'},
      {key: 15, value: 'fifteen'},
      {key: 14, value: 'fourteen'},
      {key: 13, value: 'thirteen'},
      {key: 12, value: 'twelve'},
      {key: 11, value: 'eleven'},
      {key: 10, value: 'ten'},
      {key: 9, value: 'nine'},
      {key: 8, value: 'eight'},
      {key: 7, value: 'seven'},
      {key: 6, value: 'six'},
      {key: 5, value: 'five'},
      {key: 4, value: 'four'},
      {key: 3, value: 'three'},
      {key: 2, value: 'two'},
      {key: 1, value: 'one'},
    ]
    
    if (!Number.isInteger(number)) {
      return 'Input is not a valid integer.'
    }

    if (number <= 0 || number > Number.MAX_SAFE_INTEGER) {
      return 'Number needs to be greater than 0 or less than 2^53-1.'
    }
    let result = ''

    for (const n of stringLookup) {
      if (number >= n.key) {
        if (number < 100) {
          result += n.value
          number -= n.key
          number > 0 ? result += ' ' : result
        } else {
          const quotient = Math.floor(number / n.key)
          const remainder = number % n.key
          return remainder > 0 ? `${numberToString(quotient)} ${n.value} ${numberToString(remainder)}` : `${numberToString(quotient)} ${n.value}`
        }
      }
    }
    return result
  }
```

```js
numberToString(1462); // one thousand four hundred sixty two
numberToString(133452); // one hundred thirty three thousand four hundred fifty two
numberToString("text"); // Input is not a valid number.
numberToString(-5) // Number needs to be greater than 0 or less than 2^53-1.
```
