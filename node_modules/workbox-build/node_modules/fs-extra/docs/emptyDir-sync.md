# emptyDirSync(dir)

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

**Alias:** `emptydirSync()`

- `dir` `<String>`

## Example:

```js
const fs = require('fs-extra')

// assume this directory has a lot of files and folders
fs.emptyDirSync('/tmp/some/dir')
```
