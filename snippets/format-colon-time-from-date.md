### Format Colon Timestamp from Date (12 hour format)

Utilizes to12Hour() to transform date.getHours() to 12 hour format and toDigits to maintain double digits for time integers. Formats integers from given date object into a colon time representation.

```js
let toColonTime12 = ( date ) => {
    let times = [ to12Hour(date.getHours()), date.getMinutes(), date.getSeconds() ];
    return times.map( t => setDigits(t, 2, 1) ).join(":");
}
// toColonTime12(new Date()) -> "08:38:00"
```