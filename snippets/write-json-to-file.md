### Write a JSON to a file

Use `fs.writeFile()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require('fs');
const jsonToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2))
// jsonToFile({test: "is passed"}, 'testJsonFile') -> writes the object to 'testJsonFile.json'
```
