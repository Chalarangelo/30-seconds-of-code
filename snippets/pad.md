### pad

Pads `string` on the left and right side if it's shorter than `length`.
String is *NOT* truncated on both sides if it exceeds length.

```js
const pad = (string, length = 8, char = ' ') =>
  string.padStart((string.length + length) / 2, char).padEnd(length, char);
module.exports = pad;
```

```js
pad('cat'); //> '  cat   '
pad(String(42), 4, '0'); //> '004200'
pad('foobar', 3); //> 'foobar'
```
