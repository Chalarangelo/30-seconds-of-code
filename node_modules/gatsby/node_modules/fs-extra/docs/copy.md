# copy(src, dest, [options, callback])

Copy a file or directory. The directory can have contents. Like `cp -r`.

- `src` `<String>`
- `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
  - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
  - `dereference` `<boolean>`: dereference symlinks, default is `false`.
  - `preserveTimestamps` `<boolean>`: will set last modification and access times to the ones of the original source files, default is `false`.
  - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. Can also return a `Promise` that resolves to `true` or `false` (or pass in an `async` function).
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err)

  console.log('success!')
}) // copies file

fs.copy('/tmp/mydir', '/tmp/mynewdir', err => {
  if (err) return console.error(err)

  console.log('success!')
}) // copies directory, even if it has subdirectories or files

// Promise usage:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

**Using filter function**

```js
const fs = require('fs-extra')

const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
}

fs.copy('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc }, err => {
  if (err) return console.error(err)

  console.log('success!')
})
```
