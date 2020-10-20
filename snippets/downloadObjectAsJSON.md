---
title: downloadObjectAsJSON
tags: function,object,advanced
---

Downloads a javascript Object/Array of objects as a JSON file

- The arguments for the function are the object variable name, and a string.
- The object variable name is the variable the you want to download.
- The string is the file name that will be downloaded.
- Can be used in the console if defined globally.

```js
const downloadObjectAsJSON = (exportObj, exportName) => {
  let dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
```

```js
downloadObjectAsJSON(configObject, 'configFileName'); // configFileName.json downloads with the contents of configObject
```
