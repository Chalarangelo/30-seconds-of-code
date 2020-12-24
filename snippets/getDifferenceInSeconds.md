---
title: getDifferenceInSeconds
tags: dates,beginner
---

Returns the diffrence in seconds between 2 supplied dates.

```js
const getDifferenceInSeconds = (start, end) =>
  (end.getTime() - start.getTime()) / 1000;
```

```js
getDifferenceInSeconds(new Date('2020-12-24 00:00:15'), new Date('2020-12-24 00:00:17')); // 2
```
