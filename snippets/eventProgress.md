---
title: eventProgress
tags: date,beginner
---

Calculates the percentage left for a certain timespan, such as a calendar event.

- The function takes three arguments: beginning of the event, end of the event, current time.
- All three arguments are JS Date objects.
- If no current time is provided, it is assumed to be the present moment.
- The function substracts the beginning from the end to determine the range of the event.
- After, it finds the difference between the start and the current point of progress.
- This is divided by the range to get a percentage.
- Math.max and Math.min are used to ensure that the number returned is between 0 and 100.

```js
const eventProgress = (start, end, current = new Date()) =>
  {
    const range = end - start;
    const diff = current - start;
    return Math.max(Math.min(percentage = diff/range * 100, 100), 0);
  }
```

```js
eventProgress(new Date(2020, 08, 18, 6), new Date(2020, 08, 18, 7), new Date(2020, 08, 18, 6, 30)); // 50
```
