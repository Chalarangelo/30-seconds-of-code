---
title: readCookie
tags: browser,cookie,advanced
---

A function to read a cookie

- Take the cookiename as parameter (cname).
- Returns the cookie value if cookie exists
- Returns an empty string "" if cookie doesn't exist

```js
const readCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
```

```js
readCookie('username'); // cookieValue of 'username' is returned as a string
```
