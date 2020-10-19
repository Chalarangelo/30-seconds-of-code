---
title: Preload your Images
tags: browser,intermediate
---
This snippet will prevent your site from having that awkward time when it is only displaying part of the site; this not only looks bad but is also unprofessional. All you have to do is add your images to the preloadImages section and you are ready to roll.


```js
 type="text/javascript">
var images = new Array();

function preloadImages(){

    for (i=0; i < preloadImages.arguments.length; i++){

         images[i] = new Image();

        images[i].src = preloadImages.arguments[i];

    }

}

preloadImages("logo.jpg", "main_bg.jpg", "body_bg.jpg", "header_bg.jpg");
```