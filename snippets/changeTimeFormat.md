---
title: changeTimeFormat
tags:  string, beginner
firstSeen: 2021-09-02T21:06:06+03:00
---

Converts a string of `24 Hour Format Time` to a `12 Hour Format Time` 

- Length of the `24 Hour Format time string` must be equal to 8 i.e. format is `hh:mm:ss`.
- checking if hour is not greater than 23  and minutes , seconds is not greater than 59.
- If hour is less than or equal to 11 just concat the given string with `am`.
- If hour is greater than 11 , first adjust the hour and then just concat the string to make time in `pm`.

```js
const changeTimeFormat =  (time) => {

                let hour = time.substring(0,2);
                let minutes = time.substring(3,5);
                let seconds = time.substring(6,8);
                let am = "AM" ;
                let pm = "PM" ;

                if(time.length !== 8 ) return "valid time format is hh:mm:ss";
           
                if(time.length > 8 || hour > 23 ||  minutes > 59 || seconds > 59) return "Please enter valid time";

                if( hour <= 11) return time + " " +am; 

                if(hour >= 12) {
                  hour =  hour -12;

                  if(hour <= 9) hour = "0" + hour ;

                  return  hour + ":" +minutes+ ":"+seconds +" " +pm; 
                 }
            }
```

```js
 changeTimeFormat("12:10:21"); // 00:10:21 PM
 changeTimeFormat("1:10:21"); // valid time format is hh:mm:ss
```
