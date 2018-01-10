### mask

Replaces all but the last `num` of characters with the specified mask character.

Use `String.slice()` to grab the portion of the characters that need to be masked and use `String.replace()` with a regexp to replace every character with the mask character.
Concatenate the masked characters with the remaining unmasked portion of the string.
Omit the second argument, `num`, to keep a default of `4` characters unmasked. If `num` is negative, the unmasked characters will be at the start of the string.
Omit the third argument, `mask`, to use a default character of `'*'` for the mask.

```js
const mask = (cc, num = 4, mask = '*') =>
  ('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);
```

```js
mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, '$'); // '$$$$567890'
```
