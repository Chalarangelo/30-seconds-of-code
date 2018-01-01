### mask

Replaces all but the last `num` of characters (first if `num` is negative, by default `4`) with the provided mask character (`'*'` by default).

Use `Array.slice()` to grab the portion of the characters that need to be masked and use `Array.replace()` with a regex to replace every character with the mask character. Concatenate the masked characters with the remaining unmasked portion of the string.

```js
const mask = (cc,num = 4,mask = '*') =>
   cc.slice(0, -num).replace(/./g, mask) + cc.slice(-num);
```

```js
mask(1234567890) // '******7890'
mask(1234567890,3) // '*******890'
mask(1234567890,4,'$') // '$$$$$$7890'
mask(1234567890,-4,'$') // '1234$$$$$$'
```
