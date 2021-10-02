---
title: parseJWT
tags: browser,string,intermediate
firstSeen: 2016-07-24T14:40:16+02:00
lastUpdated: 2019-06-10T16:28:04+03:00
---

Decode the payload of JWT using JavaScript, without using a library or the `jwt.io` site. The token just returns a payload object that can consumed by your front-end code.

- Use `String.prototype.split('.')[1]` to extract the Base64Url encoded second part of the JSON Web Token.
- Then base64 decode it, using `decodeURIComponent()` and the `atob` functions to finally get the stringified JSON.
- Use the parsed Object by returning the `JSON.parse()` of the output.

```js
function parseJwt(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
```

```js
const parsedPayLoadFromToken = parseJWT(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
);
```
