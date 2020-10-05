| Title           | Tags              |
|-----------------|-------------------|
| binaryToDecimal | Math,Intermediate |

Converts a binary number to decimal.
- Initialise decimal(result) as 0
- Start from LSB(Right most bit). Check if it is 0 or 1
- add 2^(position of bit) to the result if bit is 1.
- Repeat this until all bits are checked.

``` js

const binaryToDecimal=binary=>{
 let flag=binary.toString();
 let digits=flag.length //counting no of digits in binary number by converting to string
 let decimal=0,x=0; // x is counter
 while(x<digits){
 if((Math.floor(binary%10))===1){
   decimal+=(1<<x); // 1<<x is equivalent to 2 ^ x (bitwise operator is used)
 }
 x++; //counter is increased
 binary/=10; // last digit removed after checked
 }
};
```
``` js
binaryToDecimal(101);
```


##### Warning: do not include leading zeroes in binary number as it may cause an error[ error: unknown: Legacy octal literals are not allowed in strict mode ]
