### prettyBytes

Converts a number in bytes to a human-readable string.

Use an array dictionary of units to be accessed based on the exponent. Return the prettified
string by building it up taking into account the supplied options and whether it is
negative or not.

```js
const prettyBytes = (num, options) => {
  options = { precision: 3, addSpace: true, wholeWord: false, ...options };
  const UNITS = [
    ['B', 'Byte'],
    ['KB', 'Kilo'],
    ['MB', 'Mega'],
    ['GB', 'Giga'],
    ['TB', 'Tera'],
    ['PB', 'Peta'],
    ['EB', 'Exa'],
    ['ZB', 'Zetta'],
    ['YB', 'Yotta']
  ];
  if (num < 0) num = -num;
  if (num < 1) return (num < 0 ? '-' : '') + num + ' B';
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
  const n = Number(
    (num / Math.pow(1000, exponent)).toPrecision(options.precision)
  );
  return (
    (num < 0 ? '-' : '') +
    n +
    (options.addSpace ? ' ' : '') +
    UNITS[exponent][options.wholeWord ? 1 : 0] +
    (options.wholeWord && exponent > 0 ? 'byte' : '') +
    (options.wholeWord && n !== 1 ? 's' : '')
  );
};
```

```js
/*
Default options: {
  precision: 3, // number of digits
  addSpace: true, // add a space between the unit and number?
  wholeWord: false // use the whole word or two letters?
}
*/
prettyBytes(1000); // 1 KB
prettyBytes(123456789); // 123 MB
prettyBytes(-50); // -50 B
prettyBytes(27145424323.5821); // 27.1 GB
prettyBytes(27145424323.5821, { precision: 5 }); // 27.145 GB
prettyBytes(5500, { wholeWord: true }); // 5.5 Kilobytes
prettyBytes(5500, { addSpace: false }); // 5.5KB
```
