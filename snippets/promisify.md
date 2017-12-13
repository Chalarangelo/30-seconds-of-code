### Promisify

Creates a promisified version of the given callback-style function. In Node 8+, you
can use [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original)

```js
const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        err
        ? reject(err)
        : resolve(result))
    )
// const stat = promisify(fs.stat)
// stat('foo.txt') -> Promise resolves if `foo.txt` exists, otherwise rejects
```
