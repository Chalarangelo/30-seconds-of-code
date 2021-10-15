---
title: decodeJWT
tags: string,jwt,decode,intermediate
firstSeen: 2021-10-15T10:49:00+00:00
---

Decodes a JWT to return data without any external library.

- Uses decodeURIComponent and atob to decode a JWT and return the decoded data

```js
const decodeJWT = (token) => {
  let result;
  try {
    const base64Url = token?.split(".")[1];
    const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c?.charCodeAt(0)?.toString(16))?.slice(-2))
        .join("")
    );
    result = JSON.parse(jsonPayload);
  } catch (error) {
    console.log(`Some error occurred while decoding JWT: `, error);
  }
  return result;
};
```

```js
decodeJWT(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
); // {name: "John Doe", sub: "1234567890"}
decodeJWT("some non-encoded string"); // DOMException: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
```
