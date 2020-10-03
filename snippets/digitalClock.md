---
title: currentDateAndTime
tags: object,Timer
---

Returns Current Time(Digital Clock)

- Create a function to calculate a time
- Use `Date()` object to extract current hour, minute and second
- check whether its `AM` or `PM`
- Do required calculations and ammend the hour, minute and second

```js
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
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
    
    var time = h + ":" + m + ":" + s + " " + session;
    
    setTimeout(showTime, 1000);
    
}
```

```js
showTime()
```