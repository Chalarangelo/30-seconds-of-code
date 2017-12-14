### Write a JSON to a file

Write a `json` object to a `.json` file.
```js
const fs = require('fs')

const jsonToFile = (obj, filename) => fs.writeFile(`${filename}.json`, JSON.stringify(obj, null, 4))
// jsonToFile({test: "is passed"}, 'testJsonFile')
```
