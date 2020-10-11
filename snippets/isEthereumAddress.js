---
title: isEthereumAddress
tags: string,regexp,beginner
---

Checks if a string contains etherium address.

- Use `RegExp.prototype.test()` to check if input string matches against ethereum address regex pattern.

```js
const isEthereumAddress = str => /^(0x)[0-9a-f]{40}$/gi.test(str);
```

```js
isEthereumAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F'); // true
isEthereumAddress('#rggasy12Fo'); // false
```
