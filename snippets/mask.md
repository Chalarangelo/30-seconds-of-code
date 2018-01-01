### mask

It replace all but the last `num` (first if `num` is negative, by default `4`) characters by the provided masking character (`'*'` by default).

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
