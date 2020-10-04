getStringPermutations---
title: getStringPermutations
tags: string,function,intermediate
---

Get all string permutation.

- Idea is very simple. We will convert the string to an array. 
- From the array we will pick one character and then permute rest of it.
- After getting the permutation of the rest of the characters, we will concatenate
  each of them with the character we have picked

```js
const getStringPermutations = (str) => {
let arr = str.split(''),
    len = arr.length, 
    perms = [],
    rest,
    picked,
    restPerms,
    next;

    if (len === 0)
        return [str];

    for (let i=0; i<len; i++)
    {
        rest = Object.create(arr);
        picked = rest.splice(i, 1);

        restPerms = getStringPermutations(rest.join(''));

       for (let j=0, jLen = restPerms.length; j< jLen; j++)
       {
           next = picked.concat(restPerms[j]);
           perms.push(next.join(''));
       }
    }
   return perms;
}
```

```js
getStringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```
