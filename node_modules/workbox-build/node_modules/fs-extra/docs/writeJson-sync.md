# writeJsonSync(file, object, [options])

Writes an object to a JSON file.

**Alias:** `writeJSONSync()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

## Example:

```js
const fs = require('fs-extra')

fs.writeJsonSync('./package.json', {name: 'fs-extra'})
```
---

**See also:** [`outputJsonSync()`](outputJson-sync.md)
