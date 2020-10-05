---
title: digitalClock
tags: Date objects, Timer, intermediate
---

Returns Current Time(Digital Clock)

- Create a function to calculate a time
- Use `Date()` object to extract current hour, minute and second
- check whether its `AM` or `PM`, we used If/else statements
- Do required calculations and ammend the hour, minute and second
- We used setTimeout to keep the clock ticking at every 1000ms i.e 1 second

```js
const showTime = () =>
  {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    let time = h + ":" + m + ":" + s + " " + session;
    
    setTimeout(showTime, 1000);
  }
```

```js
showTime(); // current time - 22:54:30
```
