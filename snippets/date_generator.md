---
title: date_generator
tags: function,beginner
---

Get today's date formatted like the following example: 
Sat Dec 19 2015 10:36 am

```js
function dateGenerator(){
let curr = new Date()
    const months = ['January','February','March','April','May','June','July','Augest','September','October','November','December']
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satuday'];
    let minutes = curr.getMinutes()
    if(minutes.toString().length == 1) {
      minutes = '0'+curr.getMinutes()
    } else {
      curr.getMinutes()
      }
    let hours = curr.getHours()
          console.log(hours)

    if(hours.toString().length == 1) {
      hours = '0'+curr.getHours()
    } else {
      curr.getHours()
      }
    let am_pm = curr.getHours()
    if(hours >= 12) {
      am_pm = 'PM'
    } else {
      am_pm = 'AM'
      }
    
return days[curr.getDay()]+' '+months[curr.getMonth()]+' '+curr.getDate()+' '+curr.getFullYear()+' '+hours+':'+minutes+am_pm;
}

```

```js
date_generator(); // 'Wednesday April 1 2020 07:04am'
```
