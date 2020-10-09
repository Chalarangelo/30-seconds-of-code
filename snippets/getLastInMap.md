---
title: getLastInMap
tags: map,beginner
---

Since JavaScript `Map()`'s retain their order of insertion, it can sometimes be useful to get the last item or value inserted:

```js
const getLastItemInMap = map => Array.from(map)[map.size-1]
const getLastKeyInMap = map => Array.from(map)[map.size-1][0]
const getLastValueInMap = map => Array.from(map)[map.size-1][1]
```

Note that `getLastKey()` and `getLastValue()` can reuse `getLastItem()`, but for maximum portability, the implementations are written as standalone.
