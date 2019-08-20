# readJsonSync(file, [options])

Reads a JSON file and then parses it into an object. `options` are the same
that you'd pass to [`jsonFile.readFileSync`](https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options).

**Alias:** `readJSONSync()`

- `file` `<String>`
- `options` `<Object>`

## Example:

```js
const fs = require('fs-extra')

const packageObj = fs.readJsonSync('./package.json')
console.log(packageObj.version) // => 2.0.0
```

---

`readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

```js
const fs = require('fs-extra')

const file = '/tmp/some-invalid.json'
const data = '{not valid JSON'
fs.writeFileSync(file, data)

const obj = fs.readJsonSync(file, { throws: false })
console.log(obj) // => null
```
