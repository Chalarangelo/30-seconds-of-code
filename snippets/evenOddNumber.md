---
title: Even or odd number
tags: browser, begginer
---

Ask a user to enter a whole number

- Declare num variable to save the user's number
- Declare evenNumber function to make the division and return the result
- Declare the variable result to save the result
- The user sees the result through an alert

```js

var num = prompt("Enter a whole number");

const evenNumber = (num) => {
  if(num % 2 == 0) {
    return "even Number";
  }
  else {
    return "odd number";
  }
}   

var result = evenNumber(num);
alert("The number "+num+" is "+result);
```