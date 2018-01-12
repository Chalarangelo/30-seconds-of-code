### toColonTime

Returns transformed time integers from provided date object to "colon time" representation. Formats hour to 12 hour and maintains digit length of colon time format (HH:MM:SS).

```js
let toColonTime = ( date ) => {
    let times = [ date.getHours(), date.getMinutes(), date.getSeconds() ];
    times[0] = times[0] === 0 || times[0] === 12 || times[0] === 24 ? 12 : times[0] % 12;
    
    return times.map( time => time.toString().padStart(2, "0") ).join(":");
}
// toColonTime12(new Date()) -> "08:38:00"
```