# outputJson(file, object, [options, callback])

Almost the same as [`writeJson`](writeJson.md), except that if the directory does not exist, it's created.

**Alias:** `outputJSON()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFile` options](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.json'
fs.outputJson(file, {name: 'JP'}, err => {
  console.log(err) // => null

  fs.readJson(file, (err, data) => {
    if (err) return console.error(err)
    console.log(data.name) // => JP
  })
})

// With Promises:
fs.outputJson(file, {name: 'JP'})
.then(() => fs.readJson(file))
.then(data => {
  console.log(data.name) // => JP
})
.catch(err => {
  console.error(err)
})
```
