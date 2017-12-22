### toDecimalMark

Convert a float-point arithmetic to the [Decimal mark](https://en.wikipedia.org/wiki/Decimal_mark) form.

Use `toString()` to convert the float `num` to a string, then use regex to separate every three characters of the integer part with a comma.

 ```js
const toDecimalMark = (num) => {
  let numberParts = num.toString().split('.')
  return `${numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${numberParts[1]}`
}
// toDecimalMark(12305030388.9087) //-> '12,305,030,388.9087'
```
