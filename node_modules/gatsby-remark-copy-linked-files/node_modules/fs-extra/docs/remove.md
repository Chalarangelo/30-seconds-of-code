# remove(path, [callback])

Removes a file or directory. The directory can have contents. Like `rm -rf`.

- `path` `<String>`
- `callback` `<Function>`

## Example:

```js
const fs = require('fs-extra')

// remove file
fs.remove('/tmp/myfile', err => {
  if (err) return console.error(err)

  console.log('success!')
})

fs.remove('/home/jprichardson', err => {
  if (err) return console.error(err)

  console.log('success!') // I just deleted my entire HOME directory.
})

// Promise Usage
fs.remove('/tmp/myfile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```
