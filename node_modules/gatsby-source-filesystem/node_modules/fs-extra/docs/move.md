# move(src, dest, [options, callback])

Moves a file or directory, even across devices.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile', err => {
  if (err) return console.error(err)

  console.log('success!')
})

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

**Using `overwrite` option**

```js
const fs = require('fs-extra')

fs.move('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true }, err => {
  if (err) return console.error(err)

  console.log('success!')
})
```
