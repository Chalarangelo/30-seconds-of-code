# ensureFileSync(file)

Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

**Alias:** `createFileSync()`

- `file` `<String>`

## Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureFileSync(file)
// file has now been created, including the directory it is to be placed in
```
