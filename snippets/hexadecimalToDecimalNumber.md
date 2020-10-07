---
title: hexadecimalToDecimalNumber
tags: maths,string,intermediate
---

Converts hexadecimal numbers to decimal numbers

- Creates an object that serves as a dictionary to the numbers in the hexadecimal number.
- Uses `split` to transform the string in an array and then uses `shift`, `reverse` to treat the array.
- Use `for` to loop over the array and add the correct value to decNumber.

```js
const hexadecimalToDecimalNumber = hexNumber => {
  const hexToDec={
    A:10,
    B:11,
    C:12,
    D:13,
    E:14,
    F:15
  };
  let hexNumberSplit = hexNumber.split('');
  if(hexNumberSplit[0] == '#'){
    hexNumberSplit.shift();
  }
  hexNumberSplit.reverse();
  decNumber=0;
  for(i = hexNumberSplit.length-1 ; i >= 0; i--){
    if(!isNaN(parseInt(hexNumberSplit[i]))){
      decNumber += parseInt(hexNumberSplit[i])*Math.pow(16,i);
    }else{
      decNumber += hexToDec[hexNumberSplit[i]]*Math.pow(16,i);
    }
  }
  return decNumber;
}
```

```js
hexadecimalToDecimalNumber('#35FE4'); // '221156'
```
