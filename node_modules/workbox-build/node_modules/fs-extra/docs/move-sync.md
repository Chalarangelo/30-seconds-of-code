# moveSync(src, dest, [options])

Moves a file or directory, even across devices.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.

## Example:

```js
const fs = require('fs-extra')

fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
```

**Using `overwrite` option**

```js
const fs = require('fs-extra')

fs.moveSync('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true })
```
