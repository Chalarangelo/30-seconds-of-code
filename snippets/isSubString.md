---
title: isSubString
tags: intermediate,recursion
---

Checks if the second string is a substring of the first string recursively  

- Uses recursion to find out if the second string is present in the first string, parameters needed for the function is string1, string2, length of string 1 and length of string 1

```js
const subCheck = (string1, string2, len1, len2) => {
    if (len2 === 0) return true;
    else if (len1 == 0) return true;
    else if (string1[len1 - 1] === string2[len2 - 1])
        return subCheck(string1, string2, len1 - 1, len2 - 1);
    else return subCheck(string1, string2, len1 - 1, len2);
};
```

```js
subCheck('abbbabba', 'babb', 8, 4); // returns true
subCheck('abbbabba', 'babbb', 8, 5); // returns false
```
