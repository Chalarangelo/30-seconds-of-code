---
title: formatPhoneNumber
tags: string,intermediate
---

function that takes 10 digits and returns a string of the formatted phone number.

- Use `Array.prototype.splice()`to split the input string like an array, then add necessary characters and join and `Array.prototype.join()` to concatenate the array items.

- Use `throw` to throw an exception with a defined error message.


```js
const formatPhoneNumber = numbers =>
  { 
    const numbersString = numbers.toString()
    if ((numbersString.length !== 10) || isNaN(numbersString)) {
      throw new TypeError('Invalid phone number.')
    }

    return "("
    + numbers.splice(0,3).join('')
    + ") " 
    + numbers.splice(0,3).join('')
    + "-"
    + numbers.join('');
  }
```

```js
try {
  console.log(formatPhoneNumber("1234567890")); // (123) 456-7890
} catch (e){
  console.log(e.message)
}

try {
  console.log(formatPhoneNumber("123456")); 
} catch (e){
  console.log(e.message) // Invalid phone number.
}

try {
  console.log(formatPhoneNumber("123456text"));
} catch (e){
  console.log(e.message) // Invalid phone number.
}

try {
  console.log(formatPhoneNumber(1234567890)) // (123) 456-7890
} catch (e){
  console.log(e.message) 
}

try {
  console.log(formatPhoneNumber(12345))
} catch (e){
  console.log(e.message) // Invalid phone number.
} //index.html:143 
```
