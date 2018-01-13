### getColonTimeFromDate

Formats hour, minute, and second time integers from Date into stringified colon representation. Formats hour integer to 12 hour clock and maintains digit lengths to match (HH:MM:SS).

```js
const getColonTimeFromDate = date => {
    let times = [ date.getHours(), date.getMinutes(), date.getSeconds() ];
    times[0] = times[0] === 0 || times[0] === 12 || times[0] === 24 ? 12 : times[0] % 12;
    
    return times.map( time => time.toString().padStart(2, "0") ).join(":");
}
```

```js
getColonTimeFromDate(new Date()) // "08:38:00"
```