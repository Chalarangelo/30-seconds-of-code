---
title: MinToYears
tags: conversion, beginner, math
---

Takes an input of the number of minutes and converts it into days and years.
- Calculates the number of years in the minutes
- Then calculates the extra days after the years

```js
const MinToYears = minutes =>{
                var years = minutes/(60*24*365);
                var days = (minutes/(60*24))%365;
                alert(years+" years, "+days+" days.");
            }
```

```js
MinToYears(3456789); //6 years, 210 days.
```
