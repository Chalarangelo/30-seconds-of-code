### mask

It replace all but the last(first if `num` is negative) `num` (by default it is 4) characters by the provided mask(`'*'` by default).

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
