---
title: Formatting relative time in JavaScript
shortTitle: Relative time formatting
language: javascript
tags: [number,date]
cover: dog-waiting
excerpt: Did you know JavaScript has a built-in way to format relative time? It's called `Intl.RelativeTimeFormat` and it's awesome!
listed: true
dateModified: 2025-04-24
---

<baseline-support featureId="intl-relative-time-format">
</baseline-support>

I've recently stumbled upon the `Intl.RelativeTimeFormat` API, and was surprised how simple it makes solving an age-old problem: **how to format relative time**. This is a common task in web development, and while there are many libraries that do this, it's nice to see that JavaScript has a built-in way to do it. The browser support is great, too, and has been for a while now. So, let's take a look at how to use it!

## Constructing a formatter

The first step in this process is to create a new `Intl.RelativeTimeFormat` object. This object takes two arguments: the **locale** and an **options** object.

The locale is a string that specifies the locale (language & region or just language) to use for formatting. The options object accepts a `numeric` property, which can be either `always` or `auto` and a `style` property, which can be either `long`, `narrow`, or `short`.

```js
const formatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
  style: 'long',
});
```

| Options | Sample output |
| --- | --- |
| `{ numeric: 'always', style: 'long' }` | 1 day ago |
| `{ numeric: 'auto', style: 'long' }` | yesterday |
| `{ numeric: 'always', style: 'narrow' }` | 1d ago |
| `{ numeric: 'auto', style: 'narrow' }` | yesterday |


## Formatting relative time

Once we have a formatter, we can use it to **format relative time**. The formatter's `Intl.RelativeTimeFormat.prototype.format()` method takes two arguments: the **value** and the **unit**. The value is a **number** that represents the amount of time, and the unit is a **string** that specifies the time unit (`year`, `month`, `week`, `day`, `hour`, `minute`, or `second`, or their plural forms).

```js
// Assuming a formatter has been created
formatter.format(-1, 'day');  // 'yesterday'
formatter.format(0, 'year');  // 'this year'
formatter.format(1, 'month'); // 'in 1 month'
formatter.format(2, 'week');  // 'in 2 weeks'
```

## Formatting date differences

As we've seen in a [previous article](/js/s/date-difference), a little bit of math is all you need to find the **difference between two dates**. We can use this to calculate the difference between today and another date, pick the right unit and pass it to the formatter for display.

```js
const dateDifferenceInYears = (a, b) => dateDifferenceInMonths(a, b) / 12;
const dateDifferenceInMonths = (a, b) =>
  (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();

const dateDifferenceInWeeks = (a, b) => (b - a) / 604_800_000;
const dateDifferenceInDays = (a, b) => (b - a) / 86_400_000;

const dateDifferenceInHours = (a, b) => (b - a) / 3_600_000;
const dateDifferenceInMinutes = (a, b) => (b - a) / 60_000;
const dateDifferenceInSeconds = (a, b) => (b - a) / 1_000;

const formatDifference = (difference, unit) => {
  const formatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
    style: 'long',
  });

  // Strip the decimal part of the number
  return formatter.format(Number.parseInt(difference, 10), unit);
}

const formatDateDifference = date => {
  // Use the current date as the reference point for the diff.
  const now = new Date();

  // Calculate the difference in years, months, weeks and days
  const diffInYears = dateDifferenceInYears(now, date);
  const diffInMonths = dateDifferenceInMonths(now, date);
  const diffInWeeks = dateDifferenceInWeeks(now, date);
  const diffInDays = dateDifferenceInDays(now, date);

  // Calculate absolute values of the differences
  const days = Math.abs(diffInDays);
  const years = Math.abs(diffInYears);

  // < 1 day: format as hours, minutes or seconds
  // 1-14 days: format as days
  // 2 weeks - 2 years: format as months, except if exactly 1 or 2 years
  // 2+ years: format as years
  if (days >= 1)
    if (days <= 14)
      return formatDifference(Math.round(diffInDays), 'day');
    else if (days <= 30)
      return formatDifference(diffInWeeks, 'week');
    else if (years <= 2 && diffInMonths % 12 !== 0)
      return formatDifference(diffInMonths, 'month');
    else
      return formatDifference(diffInYears, 'year');

  // Calculate the difference in hours, minutes and seconds
  const diffInHours = dateDifferenceInHours(now, date);
  const diffInMinutes = dateDifferenceInMinutes(now, date);
  const diffInSeconds = dateDifferenceInSeconds(now, date);

  const hours = Math.abs(diffInHours);
  const minutes = Math.abs(diffInMinutes);

  // 12+ hours: format as days
  // 1-12 hours: format as hours
  // < 1 hour: format as minutes
  // < 1 minutes: format as seconds
  if (Math.floor(hours) !== 0)
    if (hours >= 12)
      return formatDifference(Math.sign(diffInHours) * 1, 'day');
    else
      return formatDifference(diffInHours, 'hour');
  else if (Math.floor(minutes) !== 0)
    return formatDifference(diffInMinutes, 'minute');
  else if (diffInSeconds % 60 !== 0)
    return formatDifference(diffInSeconds, 'second');
};

// Assuming today's date is 2025-03-31 11:00:00
formatDateDifference(new Date('2025-03-30'));           // 'yesterday'
formatDateDifference(new Date('2025-04-01'));           // 'tomorrow'
formatDateDifference(new Date('2025-04-02'));           // 'in 2 days'
formatDateDifference(new Date('2025-04-15'));           // 'in 2 weeks'
formatDateDifference(new Date('2025-05-15'));           // 'in 2 months'
formatDateDifference(new Date('2026-03-31'));           // 'next year'
formatDateDifference(new Date('2027-03-31'));           // 'in 2 years'
formatDateDifference(new Date('2025-03-31 12:00:00'));  // 'in 1 hour'
formatDateDifference(new Date('2025-03-31 10:00:00'));  // '1 hour ago'
formatDateDifference(new Date('2025-03-31 10:59:00'));  // '1 minute ago'
formatDateDifference(new Date('2025-03-31 10:59:59'));  // '1 second ago'
```

This is quite long, isn't it? And for good reason, too! While it seems easy to intuitively calculate the difference between two timestamps, once you get into the weeds of it, the complexity is much higher than you would expect. This one took me quite a little bit to figure out and I'm pretty sure there are still a few edge cases I haven't covered. Still, it's probably a good enough starting point for you to build upon!

## Conclusion

`Intl.RelativeTimeFormat` is a great addition to the JavaScript language. It makes formatting really easy, leaving you more space to focus on the hard parts: figuring out what unit to use and under which circumstances. Hopefully, you'll be able to take my code and tweak it to suit your needs. Cheers!
