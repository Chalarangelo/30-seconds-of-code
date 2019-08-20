# copySync(src, dest, [options])

Copy a file or directory. The directory can have contents. Like `cp -r`.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
  - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
  - `dereference` `<boolean>`: dereference symlinks, default is `false`.
  - `preserveTimestamps` `<boolean>`: will set last modification and access times to the ones of the original source files, default is `false`.
  - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. This can also be a RegExp, however this is deprecated (See [issue #239](https://github.com/jprichardson/node-fs-extra/issues/239) for background).

## Example:

```js
const fs = require('fs-extra')

// copy file
fs.copySync('/tmp/myfile', '/tmp/mynewfile')

// copy directory, even if it has subdirectories or files
fs.copySync('/tmp/mydir', '/tmp/mynewdir')
```

**Using filter function**

```js
const fs = require('fs-extra')

const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
}

fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc })
```
