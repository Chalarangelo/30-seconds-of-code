---
title: isFalsy
tags: logic, beginner
---

`Falsy` validator

- Return `true` if the input equal one of factors as follows:
  - false
  - ""
  - 0
  - undefined
  - null
  - NaN

```js
const isFalsy = (val) => val === false || val === "" || val === 0 || val ==== undefined || val === null || val === NaN;
```

```js
isFalsy(false); // 'true'
isFalsy(true); // 'false'
isFalsy(""); // 'true'
isFalsy("sampleInput"); // 'false'
isFalsy(0); // 'true'
isFalsy(1); // 'false'
isFalsy(undefined); // 'true'
isFalsy(null); // 'true'
isFalsy(NaN); // 'true'
```
