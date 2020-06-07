---
title: goobox
tags: image hosting, regex, url, google drive, dropbox, advanced
---

- string, Returns a string url that can be used directly as source of an image.
- when you host an image on google drive or dropbox you can't use the direct url of your file to be an image source.
- you need to make changes to this url in order to use it directly as an image source.
- `goobox()` will take the url of your image file, and change it to be used directly as an image source.
- Important : you need to check your files permessions first, and wether it's public.
- live example: https://ybmex.csb.app/

```js
cconst goobox = (url)=>{

    let dropbox_regex = /(http(s)*:\/\/)*(www\.)*(dropbox.com)/;
    let drive_regex =/(http(s)*:\/\/)*(www\.)*(drive.google.com\/file\/d\/)/;

    if(url.match(dropbox_regex)){
       return url.replace(/(http(s)*:\/\/)*(www\.)*/, "https://dl.");
    }
    if(url.match(drive_regex)){
        return `https://drive.google.com/uc?id=${url.replace(drive_regex, "").match(/[\w]*\//)[0].replace(/\//,"")}`;
    }
    else {
       return console.error('Wrong URL, not a vlid drobox or google drive url');
    }
}
```

```js
let url = 'https://drive.google.com/file/d/1PiCWHIwyQWrn4YxatPZDkB8EfegRIkIV/view' // can't be image src.

goobox(url);

//  https://drive.google.com/uc?id=1PiCWHIwyQWrn4YxatPZDkB8EfegRIkIV  // works as image src
```
