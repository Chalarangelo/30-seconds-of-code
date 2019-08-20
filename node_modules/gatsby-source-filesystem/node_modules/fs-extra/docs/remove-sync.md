# removeSync(path)

Removes a file or directory. The directory can have contents. Like `rm -rf`.

- `path` `<String>`

## Example:

```js
const fs = require('fs-extra')

// remove file
fs.removeSync('/tmp/myfile')

fs.removeSync('/home/jprichardson') // I just deleted my entire HOME directory.
```
