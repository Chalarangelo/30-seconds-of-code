---
title: booleanImplication
tags: math,logic,beginner
---

Returns `B` value if `A` is `true`, returns `true` if `A` is `false`.

- Use the logical not(`!`) and or(`||`) operators on the two given values to create the logical implication.

```js
const booleanImplication = (a, b) => (!a || b);
```

```js
booleanImplication(false, false); //true
booleanImplication(false, true); //true
booleanImplication(true, false); //false
booleanImplication(true, true); //true
```