### prettyBytes

Converts a number in bytes to a human-readable string.

Use an array dictionary of units to be accessed based on the exponent. 
Use `Number.toPrecision()` to truncate the number to a certain number of digits. 
Return the prettified string by building it up, taking into account the supplied options and whether it is
negative or not.

```js
const prettyBytes = (num,  precision = 3, addSpace = true) {
  const UNITS = ['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
  if (num < 1) return (num < 0 ? '-' : '') + num + ' B';
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(options.precision));
  return (
    (num < 0 ? '-' : '') +
    n +
    (options.addSpace ? ' ' : '') + UNITS[exponent]
  );
};
```

```js
prettyBytes(1000); // 1 KB
prettyBytes(123456789); // 123 MB
prettyBytes(-50); // -50 B
prettyBytes(27145424323.5821); // 27.1 GB
prettyBytes(27145424323.5821, 5 ); // 27.145 GB
prettyBytes(5500, 3, false); // 5.5KB
```
