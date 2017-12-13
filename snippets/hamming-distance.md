### Hamming distance between two numbers

Use XOR operator.
Find the binary bit difference between two number using `^` operator.Convert the result to binary string using `toString(2)`.Get the difference by getting the number of 1's in the binary digit using `match(/1/g)`.
```js
const hammingDistance = (num1, num2) => {
  return ((num1^num2).toString(2).match(/1/g) || '').length;
}
//hammingDistance(2,3) -> 1
```
