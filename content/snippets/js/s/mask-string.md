---
title: Mask a JavaScript value
shortTitle: Mask value
language: javascript
tags: [string]
cover: rocky-beach-3
excerpt: Replace all characters in a string, except for the ending characters, with a mask character.
listed: true
dateModified: 2024-02-12
---

One of the most common bits of presentational logic related to string manipulation is **masking sensitive information**. This is most often seen in relation to saved credit card numbers, but there are other use cases as well. The most common masking format replaces most characters, except for the last few, with a mask character, such as an asterisk (`*`).

Implementing a helper function to mask any value is pretty simple overall. First, we can use a **template literal** to convert the value to a string. Then, using `String.prototype.slice()`, we can grab the portion of the **characters that will remain unmasked**. Finally, we can use `String.prototype.padStart()` to **fill the beginning of the string with the mask character** up to the original length.

Using a negative `num` argument will place the unmasked characters at the **start of the string**. Omitting the second argument, `num`, will keep a default of `4` characters unmasked. Omitting the third argument, `mask`, will use a default character of `'*'` for the mask.

```js
const mask = (cc, num = 4, mask = '*') =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, '$'); // '$$$$567890'
```
