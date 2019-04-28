### createDirIfNotExists

Creates a directory, if it does not exist with `fs.mkdir`.

Using `fs.exists()` to check for the existence of a directory before calling `fs.mkdir()` is not recommended. 
Doing so introduces a race condition, since other processes may change the directory's state between the two calls. 
Instead, user code should create the directory directly and handle the error raised if the directory does not exist.

Why not `fs.mkdirSync`? In busy processes, the programmer is strongly encouraged to use the asynchronous versions of these calls. 
The synchronous versions will block the entire process until they complete — halting all connections.


```js
const fs = require('fs');
const util = require('util');
const mkdirAsync = util.promisify(fs.mkdir);

const createDirIfNotExists = dir => {
  return mkdirAsync(dir)
    .catch(e => {
      if (e.code === 'EEXIST')
        return;

      throw e;
    });
};

```

```js
createDirIfNotExists('test') // creates the directory 'test', if it doesn't exist
 .catch(e => {
   console.error(e)
 })
```
