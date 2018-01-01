### untildify

Converts a tilde path to an absolute path.

Use `String.replace()` with a regular expression and `OS.homedir()` to replace the `~` in the start of the path with the home directory.

```js
const untildify = str => str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);
```

```js
untildify('~/node') // '/Users/aUser/node'
```
