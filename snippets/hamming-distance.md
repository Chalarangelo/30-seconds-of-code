### Hamming distance between two numbers

Use XOR operator (`^`) to find the bit difference between the two numbers, convert to binary string using `toString(2)`.
Count and return the number of `1`s in the string, using `match(/1/g)`.
```js
const hammingDistance = (num1, num2) => 
  ((num1^num2).toString(2).match(/1/g) || '').length;
//hammingDistance(2,3) -> 1
```
