### Check For Palindrome

```
function palindrome(str) {
  var rg =/[\W_]/g;
  var low_rep=str.toLowerCase().replace(rg,'');
  var final= low_rep.split('').reverse().join('');
  return final == low_rep;
 }
 ```
