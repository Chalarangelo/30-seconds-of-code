---
title: progressBar
tags: JavaScript, interval, terminal, intermediate
---

Create a simple progress bar.

- Initialize a string which contain the total number of blank character.
- Create an interval to update the progress bar.
- Increment the index until the bar is complete.
- Clear the interval and log the message.

```js
const progressBar = options => {
  const {refreshMs, total, message} = options;
  const filled = '▇', blank = '-';
  let bar = blank.repeat(total), index = 0;

  const interval = setInterval(() => {
    if (index < total) {
        console.log(`${bar} | ${index}/${total}`);
        const barArray = bar.split('');
        barArray[index] = filled;
        bar = barArray.join('');
        setTimeout(() => console.clear(), refreshMs);
        index++;
    }
    else {
      clearInterval(interval);
      console.log(`${bar} | ${index}/${total} | ${message}`);
    }
  }, refreshMs);
}
```

```js
progressBar({
  refreshMs: 100,
  total: 30,
  message: 'Completed!'
});
```