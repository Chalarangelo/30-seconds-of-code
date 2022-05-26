---
title: Day name
tags: date
expertise: beginner
cover: blog_images/interior.jpg
firstSeen: 2020-10-04T00:31:08+03:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Gets the name of the weekday from a `Date` object.

- Use `Date.prototype.toLocaleDateString()` with the `{ weekday: 'long' }` option to retrieve the weekday.
- Use the optional second argument to get a language-specific name or omit it to use the default locale.

```js
const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'long' });
```

```js
dayName(new Date()); // 'Saturday'
dayName(new Date('09/23/2020'), 'de-DE'); // 'Samstag'
```
