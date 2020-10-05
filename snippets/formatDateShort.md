---
title: formatDateShort
tags: date,browser
---

Formats a date object to a short string based on selected locale. <br />
Can also add time (24-hours or 12-hours) and a precision of seconds. <br />
Default locale is 'en-US'; also by default, time isn't showed, but comes with seconds precision in 24-hours format. <br />

- Creates an Intl.DateTimeFormat object with the locale.
- Numbers are formatted with two digits, except hours in 12-hours system (1 PM, not 01 PM).
- A time system can be enforced by twelveHoursTime (true = 12h, false = 24h), otherwise it's decided from the locale.
- Formats the given date.

```js
const formatDateShort = (date=Date.now(), locale='en-US', time=false, secondsPrecision=true, twelveHoursTime) => {
  return new Intl.DateTimeFormat(locale,
    { day: '2-digit', month: '2-digit', year: 'numeric', hour12: twelveHoursTime !== undefined ? !!twelveHoursTime : undefined, hour: time ? (twelveHoursTime ? 'numeric' : '2-digit') : undefined, minute: time ? '2-digit' : undefined, second: time && secondsPrecision ? '2-digit' : undefined })
    .format(date);
}
```

```js
/* en-US (default) */
formatDateShort(); // 10/05/2020

/* en-US, with default time; time is in 12 hours by default for en-US */
formatDateShort(Date.now(), 'en-US', true); // 10/05/2020, 01:53:57 PM

/* en-US, with default time; time was made in 24 hours */
formatDateShort(Date.now(), 'en-US', true, true, false); // 10/05/2020, 13:53:57

/* it, with time, without seconds */
formatDateShort(Date.now(), 'it', true, false); // 05/10/2020, 01:54
```
