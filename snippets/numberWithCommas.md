### numberWithCommas

Use commas to separate digits。

Use `toString()` to convert the number `num` to a string, then use `/\B(?=(\d{3})+(?!\d))/g` to separate every three characters with a comma,except word boundary。

 ```js
const toThousands = (num) => {
  let cleanNum = num.toString().split('').filter(n => '0123456789.'.includes(n)).join('') 
  let wholeNum = cleanNum.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  let decNum = `.${cleanNum.split('.')[1]}`
  return wholeNum + decNum;
}

// toThousands(12305030388.9087) //-> '12,305,030,388.9087'
// toThousands(123.889087e2) //-> '12,388.9087'
// toThousands('12305030388.9087') //-> '12,305,030,388.9087'
// toThousands('12305abc030388.9087') // -> '12,305,030,388.9087'
```
