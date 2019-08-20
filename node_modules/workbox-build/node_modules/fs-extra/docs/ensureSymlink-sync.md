# ensureSymlinkSync(srcpath, dstpath, [type])

Ensures that the symlink exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`
- `type` `<String>`

## Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureSymlinkSync(srcpath, dstpath)
// symlink has now been created, including the directory it is to be placed in
```
