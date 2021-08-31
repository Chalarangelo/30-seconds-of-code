---
title: path.Dirname
tags: node
firstSeen: 2021-08-31T11:20:58+02:00
lastUpdated: 2021-08-3119T11:20:58+03:00
---

The path moudle of Node contain dirname() method or function that is used to get the Folder name of the given path. It ignores the respective platform’s trailing Folder separators.

- Parameters:
- path : File path that would be used to extract the folder name. File Path must a String value otherWise It will generate a TypeError if this parameter is not a string value.
 
---

---
```js
const path = require('path'); // module need to import for using it. 
   
Filepath = path.dirname("/user/admin/access/signin/index.html");
console.log(Filepath)
```

```js
const path = require('path'); // module need to import for using it. 
   
Filepath = path.dirname("dirname.md");
console.log(Filepath)
```
---