# Buffer Fill

A [ponyfill](https://ponyfill.com) for `Buffer.fill`.

Works as Node.js: `v6.4.0` <br>
Works on Node.js: `v0.10.0`

## Installation

```sh
npm install --save buffer-fill
```

## Usage

```js
const fill = require('buffer-fill')
const buf = Buffer.allocUnsafe(5)

console.log(buf.fill(8))
//=> <Buffer 08 08 08 08 08>

console.log(buf.fill(9, 2, 4))
//=> <Buffer 08 08 09 09 08>

console.log(buf.fill('linus', 'latin1'))
//=> <Buffer 6c 69 6e 75 73>

console.log(buf.fill('\u0222'))
//=> <Buffer c8 a2 c8 a2 c8>
```

## API

### fill(buf, value[, offset[, end]][, encoding])

- `value` &lt;String&gt; | &lt;Buffer&gt; | &lt;Integer&gt; The value to fill `buf` with
- `offset` &lt;Integer&gt; Where to start filling `buf`. **Default:** `0`
- `end` &lt;Integer&gt; Where to stop filling `buf` (not inclusive). **Default:** `buf.length`
- `encoding` &lt;String&gt; If `value` is a string, this is its encoding. **Default:** `'utf8'`
- Return: &lt;Buffer&gt; A reference to `buf`

Fills `buf` with the specified `value`. If the `offset` and `end` are not given,
the entire `buf` will be filled. This is meant to be a small simplification to
allow the creation and filling of a `Buffer` to be done on a single line.

If the final write of a `fill()` operation falls on a multi-byte character, then
only the first bytes of that character that fit into `buf` are written.

## See also

- [buffer-alloc-unsafe](https://github.com/LinusU/buffer-alloc-unsafe) A ponyfill for `Buffer.allocUnsafe`
- [buffer-alloc](https://github.com/LinusU/buffer-alloc) A ponyfill for `Buffer.alloc`
- [buffer-from](https://github.com/LinusU/buffer-from) A ponyfill for `Buffer.from`
