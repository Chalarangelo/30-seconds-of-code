### tomorrow

Results in a string representation of tomorrow's date.
Use `new Date()` to get today's date, adding `86400000` of seconds to it(24 hours), using `toISOString` to convert Date object to string.

```js
const tomorrow = () => new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
```

```js
tomorrow() // 2017-12-27 (if current date is 2017-12-26)
```
