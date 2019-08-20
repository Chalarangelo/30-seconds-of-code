# readJson(file, [options, callback])

Reads a JSON file and then parses it into an object. `options` are the same
that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

**Alias:** `readJSON()`

- `file` `<String>`
- `options` `<Object>`
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

fs.readJson('./package.json', (err, packageObj) => {
  if (err) console.error(err)

  console.log(packageObj.version) // => 0.1.3
})

// Promise Usage
fs.readJson('./package.json')
.then(packageObj => {
  console.log(packageObj.version) // => 0.1.3
})
.catch(err => {
  console.error(err)
})
```

---

`readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

```js
const fs = require('fs-extra')

const file = '/tmp/some-invalid.json'
const data = '{not valid JSON'
fs.writeFileSync(file, data)

fs.readJson(file, { throws: false }, (err, obj) => {
  if (err) console.error(err)

  console.log(obj) // => null
})

// Promise Usage
fs.readJson(file, { throws: false })
.then(obj => {
  console.log(obj) // => null
})
.catch(err => {
  console.error(err) // Not called
})
```
