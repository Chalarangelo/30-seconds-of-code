---
title: validateFile
tags: file,beginner
---

Validating file before upload based on the size and extension

- First validate by size, check the file is no more than specified size
- Check the extension file

```js
function validateFile(file) {
    let maxFileSize = 5; // in MB
    if(Math.round(file.size/1000000) > maxFileSize) {
        return { status: false, message: `Please no more than ${maxFileSize}MB.` }
    }

    let extensionAllowed = ['jpg', 'jpeg', 'gif', 'png'];
    var extensionFile = file.name.split('.');
    extensionFile = extensionFile[extensionFile.length-1];

    if(!extensionAllowed.includes(extensionFile)) {
        return { status: false, message: `Avoid extension.` }
    }

    return { status: true, message: 'ok' }
}
```

```js
file = document.getElementById("form-file").files[0];
validateFile(file);
```
