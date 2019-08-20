# emptyDir(dir, [callback])

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

**Alias:** `emptydir()`

- `dir` `<String>`
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

// assume this directory has a lot of files and folders
fs.emptyDir('/tmp/some/dir', err => {
  if (err) return console.error(err)

  console.log('success!')
})

// With promises
fs.emptyDir('/tmp/some/dir')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```
