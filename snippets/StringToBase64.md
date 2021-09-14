---
title: StringToBase64
tags: Base64,Buffer,Encoding,String,beginner
firstSeen: 2021-9-14 10:10:00 +5:30
---

Converts a String to Base64 by first converting it to Buffer.

- We first conver the provided string to buffer using `Buffer.from(<string>)` function.
- Then, we convert that buffer into a Base64 string using `<buffer>.toString('base64')`

```js
function StringToBase64(string){
if(!string) throw new Error("No String was provided, so nothing to convert")
var buffer = Buffer.from(string)
var Base64 = buffer.toString("base64")
return Base64;
}
```

```js
StringToBase64("Hello World"); // SGVsbG8gV29ybGQ=
```
