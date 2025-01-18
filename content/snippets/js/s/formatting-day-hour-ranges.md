---
title: Formatting day and hour ranges with JavaScript
shortTitle: Day and hour range formatting
language: javascript
tags: [date]
cover: tram-car-2
excerpt: I recently came across a fairly interesting algorithmic problem when formatting day and hour ranges. Here's my take on the solution.
listed: true
dateModified: 2025-01-29
---

I've long held the belief that algorithmic challenges are sort of a rarity in the world of web development, especially in frontend. But every now and then, you come across a problem that makes you think a little harder. This is exactly the case for a sort of formatting problem I recently encountered.

## Definition

Instead of boring you with all the details, I'll get straight to the specifics. Given an **array of objects**, containing **day names** and respective **working hour ranges**, I needed to format this data into an **array of human-readable strings**.

Let's look at an example to make things clearer:

```js
// Sample input:
const inputData = [
  { day: 'Tuesday', from: '09:00', to: '17:00' },
  { day: 'Wednesday', from: '09:00', to: '17:00' },
  { day: 'Thursday', from: '09:00', to: '17:00' },
  { day: 'Friday', from: '09:00', to: '17:00' },
  { day: 'Saturday', from: '10:00', to: '14:00' }
];

// Expected output:
const outputData = [
  'Monday: Closed',
  'Tuesday - Friday: 09:00 - 17:00',
  'Saturday: 10:00 - 14:00',
  'Sunday: Closed'
];
```

## Breakdown

Before even attempting to implement a solution, it's a good idea to **break down the problem**. In my head, this translates to the following subproblems:

1. **Group the days** with consecutive working hours.
2. **Format the grouped days** into human-readable strings.
3. **Add the missing days** to the final output.

While my initial thoughts were to tackle these subproblems in order, I quickly realized that the third subproblem could be solved in parallel with the first one. This would make the solution more efficient and easier to implement.

## Solution

Having broken down the problem, the solution can be approached in smaller steps, incrementally building up the final result. Let's start with the first subproblem.

This is the most algorithmic part of the problem and the one that may require the most thought to get right. I was vaguely aware of the fact that this problem is quite similar to the [arrays of consecutive elements](/js/s/arrays-of-consecutive-elements) problem I've previously solved.

After a little bit of thought, I came up with a simple solution. I could use `Array.prototype.reduce()` to **iterate over array elements**. But, as mentioned before, there may be **missing elements**. To account for this, instead of looping over the array, I decided to **loop over the days of the week**, a well-known set of elements.

Having the days of the week as a reference, I could then check if the current day matches the next day in the array. If it does, I could **group them together**. If not, I could add the current group to the result and start a new group.

Finally, if the element is missing, I could add a value of `'Closed'` to the group. This would allow me to easily **identify missing days** and add them to the final result, as well as group consecutive missing days together.

```js
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const formatDayRanges = (data) =>
  weekdays.reduce((acc, day) => {
    const dayData = data.find((d) => d.day === day);

    const hours = dayData ? `${dayData.from} - ${dayData.to}` : 'Closed';

    if (acc.length && acc[acc.length - 1].hours === hours) {
      acc[acc.length - 1].days.push(day);
    } else {
      acc.push({ days: [day], hours });
    }

    return acc;
  }, []);

// Given the sample input from the problem definition
const result = formatDayRanges(inputData);
// [
//   { days: ['Monday'], hours: 'Closed' },
//   {
//      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//      hours: '09:00 - 17:00'
//   },
//   { days: ['Saturday'], hours: '10:00 - 14:00' },
//   { days: ['Sunday'], hours: 'Closed' }
// ]
```

That's a great start! The next step is to **format the grouped days** into human-readable strings. Notice that we've already formatted the hour ranges in the previous step to make comparison easier, which will come in handy here.

In the case of a **single day**, we'll simply output the day name and the working hours. For **multiple days**, we'll output the first and last day of the range, followed by the working hours. Additionally, I'd like to make sure that **special ranges of days** are formatted correctly, such as when the range spans the entire week, all weekdays, or just the weekend.

```js
const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekendDays = ['Saturday', 'Sunday'];
const allDays = [...workingDays, ...weekendDays];

const formatDayRanges = (data) =>
  allDays.reduce((acc, day) => {
    const dayData = data.find((d) => d.day === day);

    const hours = dayData ? `${dayData.from} - ${dayData.to}` : 'Closed';

    if (acc.length && acc[acc.length - 1].hours === hours) {
      acc[acc.length - 1].days.push(day);
    } else {
      acc.push({ days: [day], hours });
    }

    return acc;
  }, []).map(({ days, hours }) => {
    if (days.length === 1) return `${days[0]}: ${hours}`;
    if (days.length === 7) return `Everyday: ${hours}`;
    if (workingDays.every((day) => days.includes(day)))
      return 'Weekdays: ' + hours;
    if (weekendDays.every((day) => days.includes(day)))
      return 'Weekend: ' + hours;
    return `${days[0]} - ${days[days.length - 1]}: ${hours}`;
  });

// Given the sample input from the problem definition
const result = formatDayRanges(inputData);
// [
//   'Monday: Closed',
//   'Tuesday - Friday: 09:00 - 17:00',
//   'Saturday: 10:00 - 14:00',
//   'Sunday: Closed'
// ]
```

Notice that we're using a **second loop** over the first grouped result in the form of `Array.prototype.map()`. This can be avoided, but I found it to be more readable and easier to understand. Moreover, the performance impact is negligible.

Another point of interest is the use of `Array.prototype.every()` to check if **all days in a range** are working days or weekend days. This is a simple and efficient way to check for special cases. However, were we to swap the places of `days` and `workingDays` (or `weekendDays`), we'd end up in a situation where we'd have to check for the length of the `days` array. This is because `Array.prototype.every()` would return `true` for an empty array or an array with fewer elements than the `workingDays` or `weekendDays` arrays.

## Conclusion

This problem was a great exercise in breaking down a problem into smaller subproblems and incrementally building up the solution. It's a great example of how algorithmic thought can come in handy for everyday problems, even in frontend development. Hope you enjoyed my approach and learned something new!
