### toDecimalMark

Convert a float-point arithmetic to the [Decimal mark](https://en.wikipedia.org/wiki/Decimal_mark) form.

Use `toString()` to convert the float `num` to a string, then use regex to separate every three characters of the integer part with a comma.

 ```js
const toDecimalMark = (num) => {
  let cleanNum = num.toString().split('').filter(n => '0123456789.'.includes(n)).join('') 
  let wholeNum = cleanNum.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  let decNum = `.${cleanNum.split('.')[1]}`
  return wholeNum + decNum;
}
// toDecimalMark(12305030388.9087) //-> '12,305,030,388.9087'
// toDecimalMark(123.889087e2) //-> '12,388.9087'
// toDecimalMark('12305abc030388.9087') // -> '12,305,030,388.9087'
```
