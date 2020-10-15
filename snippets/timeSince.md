---
title: timeSince
tags: date,math,timesince,time, intermediate
---

Returns a string in timesince format about when the event happened. Eg. (10s ago, 5h ago).

- Takes time as argument and divides effectively by seconds to know when the event happened.
- In case of no arguments, it will take `new Date()` as default.
- When time difference is more than 24 hours, it returns the date when the event happened.

```js
const timeSince = (receivedDate) => {
  const date = new Date(receivedDate) || new Date();
  if (date) {
    const now = new Date();
    const secondsPast = (now.getTime() - date) / 1000;
    if (secondsPast < 60) {
      return `${parseInt(secondsPast)}s ago`;
    }
    if (secondsPast < 3600) {
      return `${parseInt(secondsPast / 60)}m ago`;
    }
    if (secondsPast <= 86400) {
      return `${parseInt(secondsPast / 3600)}h ago`;
    }
    if (secondsPast > 86400) {
      const day = new Date(date).getDate();
      const month = new Date(date)
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(' ', '');
      const year =
        new Date(date).getFullYear() === now.getFullYear()
          ? ''
          : ` ${new Date(date).getFullYear()}`;
      return `${day} ${month}${year}`;
    }
  }
  return 'NA';
};
```

```js
timeSince(1602141584112); // "8 Oct"
timeSince(new Date()); // "0s ago"
```
