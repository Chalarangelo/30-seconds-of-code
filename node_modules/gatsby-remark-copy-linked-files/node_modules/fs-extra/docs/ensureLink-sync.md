# ensureLinkSync(srcpath, dstpath)

Ensures that the link exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`

## Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureLinkSync(srcpath, dstpath)
// link has now been created, including the directory it is to be placed in
```
