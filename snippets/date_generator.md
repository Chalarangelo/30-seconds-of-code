---
title: date_generator
tags: function,beginner
---

Get today's date formatted like the following example: 
Sat Dec 19 2015 10:36 am

```js
function date_generator()
  {
    let curr = new Date()
    const months = ['January','February','March','April','May','June','July','Augest','September','October','November','December']
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satuday'];
    let minutes = curr.getMinutes().toString().length == 1 ? '0'+curr.getMinutes() : curr.getMinutes()
    let hours = curr.getHours().toString().length == 1 ? '0'+curr.getHours() : curr.getHours()
    let am_pm = curr.getHours() >= 12 ? 'pm' : 'am'
    
return days[curr.getDay()]+' '+months[curr.getMonth()]+' '+curr.getDate()+' '+curr.getFullYear()+' '+hours+':'+minutes+am_pm;
}
```

```js
date_generator(); // 'Wednesday April 1 2020 07:04am'
```
