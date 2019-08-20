# About `fs.read()` & `fs.write()`

[`fs.read()`](https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback) & [`fs.write()`](https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback) are different from other `fs` methods in that their callbacks are called with 3 arguments instead of the usual 2 arguments.

If you're using them with callbacks, they will behave as usual. However, their promise usage is a little different. `fs-extra` promisifies these methods like [`util.promisify()`](https://nodejs.org/api/util.html#util_util_promisify_original) (only available in Node 8+) does.

Here's the example promise usage:

## `fs.read()`

```js
// Basic promises
fs.read(fd, buffer, offset, length, position)
  .then(results => {
    console.log(results)
    // { bytesRead: 20, buffer: <Buffer 0f 34 5d ...> }
  })

// Async/await usage:
async function example () {
  const { bytesRead, buffer } = await fs.read(fd, Buffer.alloc(length), offset, length, position)
}
```

## `fs.write()`

```js
// Basic promises
fs.write(fd, buffer, offset, length, position)
  .then(results => {
    console.log(results)
    // { bytesWritten: 20, buffer: <Buffer 0f 34 5d ...> }
  })

// Async/await usage:
async function example () {
  const { bytesWritten, buffer } = await fs.write(fd, Buffer.alloc(length), offset, length, position)
}
```
