---
title: getFormattedDuration
tags: JavaScript,Date,intermediate
---

Returns the `Duration` of time in short & understandable forms

- Method takes only one parameter, `seconds count` of the duration, as `number`
- Use `Math.floor()` to appropriately round the resulting timestamp to an integer.
- Use `Array.prototype.slice(0,2)` to return only two bigger units.
- Use `String.prototype.join(' ')` to combine the values into a string.
- Default output is: `0s`, even if no parameter passed.

```js
const getFormattedDuration = seconds =>
  {
    let finalDuration = [];
    let remainingSeconds = seconds || 0;
    if (remainingSeconds >= 2592000){ // 30 days
      finalDuration.push(`${Math.floor(remainingSeconds/2592000)}M`)
      remainingSeconds %= remainingSeconds%2592000
    }
    if (remainingSeconds >= 86400) {  // 1 day
      finalDuration.push(`${Math.floor(remainingSeconds/86400)}D`)
      remainingSeconds %= remainingSeconds%86400
    }
    if (remainingSeconds >= 3600) { // 1 hour
      finalDuration.push(`${Math.floor(remainingSeconds/3600)}h`)
      remainingSeconds = remainingSeconds%3600
    }
    if (remainingSeconds >= 60) { // 1 minute
      finalDuration.push(`${Math.floor(remainingSeconds/60)}m`)
      remainingSeconds = remainingSeconds%60
    }
    finalDuration.push(`${remainingSeconds}s`);
    return finalDuration.slice(0,2).join(' ');
  }
```

```js
getFormattedDuration(40); // '40s'
getFormattedDuration(400); // '6m 40s'
getFormattedDuration(4000); // '1h 6m'
getFormattedDuration(40000); // '11h 6m'
getFormattedDuration(400000); // '4D 5h'
getFormattedDuration(4000000); // '1M 13D'
```
