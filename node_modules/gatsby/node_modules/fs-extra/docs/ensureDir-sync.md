# ensureDirSync(dir)

Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

**Aliases:** `mkdirsSync()`, `mkdirpSync()`

- `dir` `<String>`

## Example:

```js
const fs = require('fs-extra')

const dir = '/tmp/this/path/does/not/exist'
fs.ensureDirSync(dir)
// dir has now been created, including the directory it is to be placed in
```
