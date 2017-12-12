### Check For Palindrome

Steps :
1. First Converted to form in which no non-alphanumeric character is present i.e. string which is to be compared
2. Then Converted to palindrome form in which characters will be reversed and will be compared to non-alphanumeric string

```
palindrome = str => (str.toLowerCase().replace(/[\W_]/g,'').split('').reverse().join('')==str.toLowerCase().replace(/[\W_]/g,''));
 ```
