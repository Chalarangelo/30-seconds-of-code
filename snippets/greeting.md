---
title: timeBasedGreeting
tags: browser,beginner
---

Greets a User based on Local Timeframe.

- Declare empty variable `showRespect`
- Use `new Date().getHours()` to get local time in hours
- Declare conditional statement on local time to populate `showRespect` with Greeting String

```js
function myFunction() {    
    const showRespect;  
    let t =new Date().getHours();
    if (t < 12){
        showRespect= 'Good Morning'
    }
    else if(t < 17){
        showRespect=  'Good Day'
    }
    else if(t < 21){
        showRespect= 'Good Evening'
    }
    else{
        showRespect= 'Good Night'
    }
    console.log(showRespect);
}
```

```js
myFunction();
```