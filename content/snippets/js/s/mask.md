---
title: Mask a value
type: snippet
language: javascript
tags: [string]
cover: rocky-beach-3
dateModified: 2020-10-21
---

Replaces all but the last `num` of characters with the specified mask character.

- Use `String.prototype.slice()` to grab the portion of the characters that will remain unmasked.
- Use `String.prototype.padStart()` to fill the beginning of the string with the `mask` character up to the original length.
- If `num` is negative, the unmasked characters will be at the start of the string.
- Omit the second argument, `num`, to keep a default of `4` characters unmasked.
- Omit the third argument, `mask`, to use a default character of `'*'` for the mask.

```js
const mask = (cc, num = 4, mask = '*') =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
```

```js
mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, '$'); // '$$$$567890'
```
