---
title: getISO8601StringTzAware
tags: browser,node,date
---

Fetches an ISO8601 compliant datetime string with timezone awareness.

_NOTE_: Use `Date.prototype.toISOString()` for UTC/GMT non-tz aware ISO8601 datetime string

```js
/**
 * Fetch ISO8601 compliant date string with tz offset.
 * Use `Date.prototype.toISOString()` for UTC/GMT non-tz
 * datetime string.
 */
const getISO8601StringWithTz = (d) => {
  const tzo = -d.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  const pad = (num) => {
    const norm = Math.floor(Math.abs(num));
    // tslint:disable-next-line:no-magic-numbers
    return (norm < 10 ? '0' : '') + norm;
  };
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ':' +
    pad(tzo % 60)
  );
};
```

```js
getISO8601StringWithTz(new Date()); // "2020-10-06T20:43:33-04:00"
```
