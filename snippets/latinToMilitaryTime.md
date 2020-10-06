---
title: latinToMilitaryTime
tags: time,beginner
---

Returns a military(24h) time from the latin(12h) time string.

- Uses `split()` and conditional statements to convert the 12h `HH:MM AM/PM` format time to 24h format time.

```js
const latinToMilitaryTime = (latin_time) => {
  const [time, am_pm] = latin_time.split(' ');
  let [h, m] = time.split(':');
  h = parseInt(h,10);
  if(h===12) h = 0;
  if(am_pm==='PM') h = h+12;
  return `${h}:${m}`;
};
```

```js
latinToMilitaryTime('1:00 PM'); // "13:00"
```
