### JSONToFile

Writes a JSON object to a file.

Use `fs.writeFile()`, template literals and `JSON.stringify()` to write a `json` object to a `.json` file.

```js
const fs = require('fs');
const JSONToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 2));
// JSONToFile({test: "is passed"}, 'testJsonFile') -> writes the object to 'testJsonFile.json'
```
