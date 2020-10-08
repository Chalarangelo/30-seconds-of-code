---
title: downloadFile
tags: browser,url,file,intermediate
---

Programmatically invokes browser download from given data or url.

- Downloads a file from url 
- Downloads data supplied in string

```js
const downloadFile = (url, filename) => {
  fetch(url).then(function(t) {
    return t.blob().then((b)=>{
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      }
    );
  });
}
```

```js
functionName('sampleInput'); // 'sampleOutput'
```
