---
title: numberWithCommas
tags: number,array,beginner
---

Add commas after every third digit from right to left of a number.

-   If the number is less than 3 digits then return the number as it is.
-   Otherwise, split each character of that string to an array element by using `String.prototype.split()`. 
-   Reverse the Array (`Array.prototype.reverse()`) because we need to add commas from right to left.
-   Remove the first three elements using `Array.prototype.splice()`, reverse those elements, and convert them to a string using `Array.prototype.join()`.
-   Append `,` in the starting of that string and concatenate previously converted string (`prev`) to its end. 
-   Repeat it until the length of the array is equal to or less than 3.
-   At the end of the while loop, we will be left with the 3 or fewer elements in the Array.
-   Reverse them and convert them to string as well. 
-   Return that string by appending `prev` string to its end. 

```js
const numberWithCommas = (number) => {
  if (number.length < 3) return number;

  number = number.split('').reverse();
  let prev = '';

  
  while (number.length > 3)
    prev = ',' + number.splice(0, 3).reverse().join('') + prev;

  return number.reverse().join('') + prev;
};
```

```js
numberWithCommas('442'); // '444'
numberWithCommas('1000'); // '1,000'
numberWithCommas('1023457812367180'); // '1,023,457,812,367,180'
```
