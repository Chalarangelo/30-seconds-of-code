---
title: base64ToFile
tags: base64,file,beginner
---

Converting base64 to file

```js
function base64ToFile(base64String) {
  require("fs").writeFile("out.ext", base64String, 'base64', function(err) {
    console.log(err);
  });
}
```

```js
base64ToFile('aHR0cHM6Ly93d3cuMzBzZWNvbmRzb2Zjb2RlLm9yZy8='); // the file will be created
```
