---
title: cookies
tags: cookies,intermediate
---

A cookie is a small piece of text stored on the visitor's computer by a web browser. This code will create a cookie.

- It takes four input parameters.
- cName is the cookie name that will store the string cValue.
- cPath refers to the directory that can access cookies.
- cExpires sets the expiration time of a cookie.

```js
const cookies = (cName, cValue, cPath, cExpires) => {document.cookie = cName + "=" + cValue +"expires=" + cExpires + cPath ;}
```

```js
cookies("Name","George ","","Mon, 12 Jun 2011:00:00:00 GMT");
alert(document.cookie); // 'sampleOutput'
```
