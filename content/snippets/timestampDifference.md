---
title: timestampDifference
tags: date, math
---

Returns the difference (in seconds) between two timestamps.

```js
const timestampDifference = (t1, t2) => Math.abs(t2 - t1) / 1000;

timestampDifference(1650000000000, 1650000003000); // 3
